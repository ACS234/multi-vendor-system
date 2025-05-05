from rest_framework import serializers
from .models import *

# Vendor
class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'

# Category
class CategorySerializer(serializers.ModelSerializer):
    parent_name = serializers.CharField(source='parent.name', read_only=True)
    class Meta:
        model = Category
        fields = ['id', 'name', 'parent', 'parent_name']

# Product Image
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'

# Product Variant
class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = '__all__'

# Product
class ProductSerializer(serializers.ModelSerializer):
    # vendor = VendorSerializer(read_only=True)
    vendor=serializers.PrimaryKeyRelatedField(queryset=Vendor.objects.all())
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

# Order Item
class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    vendor = VendorSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = '__all__'

# Order
class OrderSerializer(serializers.ModelSerializer):
    # customer = UserSerializer(read_only=True)
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

# Payment
class PaymentSerializer(serializers.ModelSerializer):
    order = OrderSerializer(read_only=True)
    vendor = VendorSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = '__all__'

# Review
class ReviewSerializer(serializers.ModelSerializer):
    # user = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = '__all__'

# Shipping Address
class ShippingAddressSerializer(serializers.ModelSerializer):
    # user = UserSerializer(read_only=True)
    order = OrderSerializer(read_only=True)

    class Meta:
        model = ShippingAddress
        fields = '__all__'

# Notification
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

# Wallet Transaction
class WalletTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WalletTransaction
        fields = '__all__'

# Wishlist
class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = '__all__'

# Coupon
class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = '__all__'
