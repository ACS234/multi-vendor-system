from django.urls import path
from .views import *

urlpatterns = [
    # Vendors
    path('vendors/', VendorListView.as_view(), name='vendor-list-create'),
    path('vendors/<int:pk>/', VendorDetailAPIView.as_view(), name='vendor-detail'),

    # Products
    path('products/', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetailAPIView.as_view(), name='product-detail'),
    
    # Product Varient
    path('pvarients/', ProductVariantAPIView.as_view(), name='product-list-create'),
    path('pvarients/<int:pk>/', ProductVarientDetailAPIView.as_view(), name='product-detail'),
    
    
    #Category
    path('categories/', CategoryList.as_view(), name='category-list-create'),
    path('category/<int:pk>/', CategoryDetailView.as_view(), name='category-detail'),
    path('category/<str:category_name>/', CategoryListCreateView.as_view(), name='category-products'),
    

    # Orders
    path('carts/', CartListCreateView.as_view(), name='cart-list'),
    path('carts/<int:pk>/', CartDetailView.as_view(), name='cart-detail'),

    # Cart Item URLs
    path('cart-items/', CartItemListCreateView.as_view(), name='cart-item-list'),
    path('cart-items/<int:pk>/', CartItemDetailView.as_view(), name='cart-item-detail'),

    # Order URLs
    path('orders/', OrderListCreateView.as_view(), name='order-list'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('orders/<int:pk>/status/', OrderStatusUpdateView.as_view(), name='order-status-update'),

    # Order Item URLs
    path('order-items/', OrderItemListCreateView.as_view(), name='order-item-list'),
    path('order-items/<int:pk>/', OrderItemDetailView.as_view(), name='order-item-detail'),

    # Payments
    path('payments/', PaymentAPIView.as_view(), name='payment'),

    # Reviews
    path('reviews/', ReviewAPIView.as_view(), name='review'),

    # Shipping
    path('shipping-addresses/', ShippingAddressAPIView.as_view(), name='shipping-address'),

    # Notifications
    path('notifications/', NotificationAPIView.as_view(), name='notification'),

    # Wallet
    path('wallet-transactions/', WalletTransactionAPIView.as_view(), name='wallet-transaction'),

    # Wishlist
    path('wishlist/', WishlistAPIView.as_view(), name='wishlist'),

]