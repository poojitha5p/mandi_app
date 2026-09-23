from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    register, me, CategoryViewSet, ProductViewSet, WeightOptionViewSet,
    PreparationOptionViewSet, ProductVariantViewSet, InventoryViewSet,
    CartViewSet, CartItemDetailView, OrderViewSet, AdminOrderViewSet, create_payment_order, admin_dashboard, admin_customers
)

router = DefaultRouter()
router.register("categories", CategoryViewSet, basename="categories")
router.register("products", ProductViewSet, basename="products")
router.register("weights", WeightOptionViewSet, basename="weights")
router.register("preparations", PreparationOptionViewSet, basename="preparations")
router.register("variants", ProductVariantViewSet, basename="variants")
router.register("inventory", InventoryViewSet, basename="inventory")
router.register("cart", CartViewSet, basename="cart")
router.register("orders", OrderViewSet, basename="orders")
router.register("admin/orders", AdminOrderViewSet, basename="admin-orders")

urlpatterns = [
    path("auth/register/", register),
    path("auth/login/", TokenObtainPairView.as_view()),
    path("auth/token/refresh/", TokenRefreshView.as_view()),
    path("auth/me/", me),
    path("admin/dashboard/", admin_dashboard),
    path("admin/customers/", admin_customers),
    path("", include(router.urls)),
    path("cart/items/<int:item_id>/", CartItemDetailView.as_view()),
    path("payments/create/<int:order_id>/",create_payment_order,),
]
