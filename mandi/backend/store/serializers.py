from decimal import Decimal

from django.db import transaction
from rest_framework import serializers
from .models import (
    User, Category, Product, ProductVariant, WeightOption,
    PreparationOption, Inventory, Cart, CartItem, Order, OrderItem
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "name", "phone", "address", "is_staff", "created_at"]
        read_only_fields = ["id", "is_staff", "created_at"]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ["email", "name", "phone", "password"]

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        read_only_fields = ["id", "created_at"]


class WeightOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeightOption
        fields = "__all__"


class PreparationOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PreparationOption
        fields = "__all__"


class InventorySerializer(serializers.ModelSerializer):
    in_stock = serializers.ReadOnlyField()

    class Meta:
        model = Inventory
        fields = ["id", "variant", "quantity", "low_stock_threshold", "in_stock", "updated_at"]
        read_only_fields = ["id", "in_stock", "updated_at"]


class ProductVariantSerializer(serializers.ModelSerializer):
    weight_label = serializers.CharField(source="weight.label", read_only=True)
    sale_price = serializers.ReadOnlyField()
    inventory = InventorySerializer(read_only=True)

    class Meta:
        model = ProductVariant
        fields = [
            "id", "product", "weight", "weight_label", "sku", "price",
            "discount_percent", "sale_price", "is_active", "inventory"
        ]
        read_only_fields = ["id", "sale_price", "inventory"]


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id", "category", "category_name", "name", "description",
            "image", "is_active", "created_at", "updated_at", "variants"
        ]
        read_only_fields = ["id", "created_at", "updated_at", "variants"]


class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="variant.product.name", read_only=True)
    weight = serializers.CharField(source="variant.weight.label", read_only=True)
    unit_price = serializers.DecimalField(source="variant.price", max_digits=10, decimal_places=2, read_only=True)
    sale_price = serializers.ReadOnlyField(source="variant.sale_price")

    class Meta:
        model = CartItem
        fields = ["id", "variant", "product_name", "weight", "quantity", "unit_price", "sale_price"]


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "items", "total", "updated_at"]

    from decimal import Decimal
    def get_total(self, obj):
        return sum(
            (
                item.variant.sale_price * item.quantity
                for item in obj.items.select_related("variant")
            ),
            Decimal("0.00")
       )
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"
        read_only_fields = ["id", "order"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user_name = serializers.CharField(source="user.name", read_only=True)
    user_email = serializers.CharField(source="user.email", read_only=True)

    class Meta:
        model = Order
        fields = [
            "id", "user", "user_name", "user_email", "status", "payment_method",
            "delivery_address", "delivery_slot", "subtotal", "delivery_fee",
            "discount", "total", "created_at", "updated_at", "items"
        ]
        read_only_fields = ["id", "user", "subtotal", "total", "created_at", "updated_at", "items"]


class CreateOrderSerializer(serializers.Serializer):
    delivery_address = serializers.CharField()
    delivery_slot = serializers.CharField(required=False, allow_blank=True)
    payment_method = serializers.ChoiceField(choices=["COD", "ONLINE"])
    delivery_fee = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=0, default=0)
    discount = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=0, default=0)

    @transaction.atomic
    def create(self, validated_data):
        user = self.context["request"].user
        cart = Cart.objects.select_for_update().prefetch_related("items__variant__inventory", "items__variant__product", "items__variant__weight").get(user=user)
        items = list(cart.items.all())
        if not items:
            raise serializers.ValidationError("Cart is empty.")

        subtotal = Decimal("0.00")
        order = Order.objects.create(user=user, **validated_data)
        for cart_item in items:
            variant = ProductVariant.objects.select_for_update().get(pk=cart_item.variant_id)
            inventory, _ = Inventory.objects.select_for_update().get_or_create(variant=variant)
            if inventory.quantity < cart_item.quantity:
                raise serializers.ValidationError(f"Insufficient stock for {variant.product.name}.")
            unit_price = variant.sale_price
            line_total = unit_price * cart_item.quantity
            subtotal += line_total
            OrderItem.objects.create(
                order=order,
                variant=variant,
                product_name=variant.product.name,
                weight_label=variant.weight.label,
                quantity=cart_item.quantity,
                unit_price=unit_price,
                line_total=line_total,
            )
            inventory.quantity -= cart_item.quantity
            inventory.save()
        order.subtotal = subtotal
        order.total = max(
            subtotal + order.delivery_fee - order.discount,
            Decimal("0.00")
        )
        order.save()
        cart.items.all().delete()
        return order
