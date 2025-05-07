from rest_framework import serializers
from .models import *

# Vendor
class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'
# Product Image
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'

# Product
class ProductSerializer(serializers.ModelSerializer):
    vendor=serializers.PrimaryKeyRelatedField(queryset=Vendor.objects.all())
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['user']


# Category
class CategoriesSerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField() 
    class Meta:
        model = Category
        fields = ['id', 'name', 'parent', 'subcategories']
    def get_subcategories(self, obj):
        return CategoriesSerializer(obj.subcategories.all(), many=True).data

class CategorySerializer(serializers.ModelSerializer):
    product=ProductSerializer(many=True)
    class Meta:
        model = Category
        fields = ['id', 'name', 'parent','product']


# Product Variant
class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = '__all__'

# Order Item
class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    vendor = VendorSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
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
