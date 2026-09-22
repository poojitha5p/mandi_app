import os
from django.db.models import Sum, Count
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from drf_spectacular.utils import extend_schema, OpenApiParameter
from .payment import get_razorpay_client
from .models import (
    User, Category, Product, ProductVariant, WeightOption,
    PreparationOption, Inventory, Cart, CartItem, Order
)
from .permissions import IsAdminUser
from .serializers import (
    UserSerializer, RegisterSerializer, CategorySerializer, ProductSerializer,
    ProductVariantSerializer, WeightOptionSerializer, PreparationOptionSerializer,
    InventorySerializer, CartSerializer, CartItemSerializer, OrderSerializer,
    CreateOrderSerializer
)


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)


@api_view(["GET", "PATCH"])
@permission_classes([IsAuthenticated])
def me(request):

    if request.method == "GET":
        return Response(
            UserSerializer(request.user).data
        )

    serializer = UserSerializer(
        request.user,
        data=request.data,
        partial=True
    )

    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filterset_fields = ["is_active"]
    search_fields = ["name", "description"]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]
        return [IsAdminUser()]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related("category").prefetch_related("variants__weight", "variants__inventory")
    serializer_class = ProductSerializer
    filterset_fields = ["category", "is_active"]
    search_fields = ["name", "description", "category__name"]
    ordering_fields = ["name", "created_at"]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]
        return [IsAdminUser()]


class WeightOptionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = WeightOption.objects.all()
    serializer_class = WeightOptionSerializer
    permission_classes = [AllowAny]


class PreparationOptionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PreparationOption.objects.filter(is_active=True)
    serializer_class = PreparationOptionSerializer
    permission_classes = [AllowAny]


class ProductVariantViewSet(viewsets.ModelViewSet):
    queryset = ProductVariant.objects.select_related("product", "weight").prefetch_related("inventory")
    serializer_class = ProductVariantSerializer
    permission_classes = [IsAdminUser]
    filterset_fields = ["product", "weight", "is_active"]


class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.select_related("variant__product", "variant__weight")
    serializer_class = InventorySerializer
    permission_classes = [IsAdminUser]
    filterset_fields = ["variant"]

    @action(detail=True, methods=["post"])
    def adjust(self, request, pk=None):
        inventory = self.get_object()
        quantity = request.data.get("quantity")
        if quantity is None:
            return Response({"detail": "quantity is required"}, status=400)
        try:
            inventory.quantity = max(0, int(quantity))
        except ValueError:
            return Response({"detail": "quantity must be an integer"}, status=400)
        inventory.save()
        return Response(self.get_serializer(inventory).data)


class CartViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def _cart(self, user):
        cart, _ = Cart.objects.get_or_create(user=user)
        return cart

    def list(self, request):
        return Response(CartSerializer(self._cart(request.user)).data)

    @extend_schema(request=CartItemSerializer)
    @action(detail=False, methods=["post"], url_path="items")
    def add_item(self, request):
        cart = self._cart(request.user)
        serializer = CartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        variant = get_object_or_404(ProductVariant, pk=serializer.validated_data["variant"].id, is_active=True)
        quantity = serializer.validated_data["quantity"]
        item, created = CartItem.objects.get_or_create(cart=cart, variant=variant, defaults={"quantity": quantity})
        if not created:
            item.quantity += quantity
            item.save()
        return Response(CartSerializer(cart).data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

    @action(detail=False, methods=["patch"], url_path=r"items/(?P<item_id>[^/.]+)")
    def update_item(self, request, item_id=None):
        item = get_object_or_404(CartItem, pk=item_id, cart__user=request.user)
        quantity = request.data.get("quantity")
        if quantity is None or int(quantity) < 1:
            return Response({"detail": "quantity must be >= 1"}, status=400)
        item.quantity = int(quantity)
        item.save()
        return Response(CartSerializer(item.cart).data)

    @action(detail=False, methods=["delete"], url_path=r"items/(?P<item_id>[^/.]+)")
    def remove_item(self, request, item_id=None):
        item = get_object_or_404(CartItem, pk=item_id, cart__user=request.user)
        cart = item.cart
        item.delete()
        return Response(CartSerializer(cart).data)


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.select_related("user").prefetch_related("items")
    serializer_class = OrderSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = CreateOrderSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


class AdminOrderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Order.objects.select_related("user").prefetch_related("items")
    serializer_class = OrderSerializer
    permission_classes = [IsAdminUser]
    filterset_fields = ["status", "payment_method"]
    search_fields = ["user__email", "user__name", "delivery_address"]

    @action(detail=True, methods=["patch"], url_path="status")
    def change_status(self, request, pk=None):
        order = self.get_object()
        new_status = request.data.get("status")
        valid = {x[0] for x in Order.STATUS_CHOICES}
        if new_status not in valid:
            return Response({"detail": f"Invalid status. Use one of: {sorted(valid)}"}, status=400)
        order.status = new_status
        order.save(update_fields=["status", "updated_at"])
        return Response(OrderSerializer(order).data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def admin_dashboard(request):
    orders = Order.objects.all()
    revenue = orders.exclude(status="CANCELLED").aggregate(total=Sum("total"))["total"] or 0
    by_status = orders.values("status").annotate(count=Count("id")).order_by("status")
    return Response({
        "total_orders": orders.count(),
        "total_revenue": revenue,
        "pending_orders": orders.filter(status__in=["PLACED", "CONFIRMED", "PROCESSING"]).count(),
        "delivered_orders": orders.filter(status="DELIVERED").count(),
        "cancelled_orders": orders.filter(status="CANCELLED").count(),
        "total_products": Product.objects.count(),
        "active_products": Product.objects.filter(is_active=True).count(),
        "low_stock_variants": Inventory.objects.filter(quantity__lte=5).count(),
        "orders_by_status": list(by_status),
    })


@api_view(["GET"])
@permission_classes([IsAdminUser])
def admin_customers(request):
    users = User.objects.filter(is_staff=False).order_by("-created_at")
    return Response(UserSerializer(users, many=True).data)

class CartItemDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, request, item_id):
        return get_object_or_404(
            CartItem,
            id=item_id,
            cart__user=request.user
        )

    def patch(self, request, item_id):
        item = self.get_object(request, item_id)

        quantity = request.data.get("quantity")

        if quantity is None:
            return Response(
                {"detail": "quantity is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            quantity = int(quantity)
        except (TypeError, ValueError):
            return Response(
                {"detail": "quantity must be an integer"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if quantity < 1:
            return Response(
                {"detail": "quantity must be at least 1"},
                status=status.HTTP_400_BAD_REQUEST
            )

        item.quantity = quantity
        item.save()

        return Response(
            CartSerializer(item.cart).data,
            status=status.HTTP_200_OK
        )

    def delete(self, request, item_id):
        item = self.get_object(request, item_id)
        cart = item.cart

        item.delete()

        return Response(
            CartSerializer(cart).data,
            status=status.HTTP_200_OK
        )
        
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_payment_order(request, order_id):

    order = get_object_or_404(
        Order,
        id=order_id,
        user=request.user
    )

    if order.payment_method != "ONLINE":
        return Response(
            {"detail": "This order is not an online payment order."},
            status=400
        )

    client = get_razorpay_client()

    razorpay_order = client.order.create({
        "amount": int(order.total * 100),
        "currency": "INR",
        "receipt": f"MANDI_ORDER_{order.id}",
    })

    order.razorpay_order_id = razorpay_order["id"]
    order.save(update_fields=["razorpay_order_id"])

    return Response({
        "order_id": order.id,
        "razorpay_order_id": razorpay_order["id"],
        "amount": int(order.total * 100),
        "currency": "INR",
        "key_id": os.getenv("RAZORPAY_KEY_ID"),
    })