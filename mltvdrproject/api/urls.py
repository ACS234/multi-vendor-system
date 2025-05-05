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
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category-detail'),

    # Orders
    path('orders/', OrderListCreateAPIView.as_view(), name='order-list-create'),
    path('orders/<int:pk>/', OrderDetailAPIView.as_view(), name='order-detail'),

    # Order Items
    path('order-items/', OrderItemAPIView.as_view(), name='order-item'),

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

    # Coupons
    path('coupons/', CouponAPIView.as_view(), name='coupon'),
]