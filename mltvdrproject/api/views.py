from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .permissions import *
from .permissions import *
from .models import *
from .serializers import *


class VendorListView(APIView):
    permission_classes = [IsAuthenticated, IsSuperAdmin]

    def get(self, request):
        vendors = Vendor.objects.all()
        serializer = VendorSerializer(vendors, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class VendorDetailAPIView(APIView):
    permission_classes = [IsAuthenticated, IsSuperAdmin]
    def get(self, request, pk):
        vender=get_object_or_404(Vendor,pk=pk)
        serializer=VendorSerializer(vender)
        return Response(serializer.data,status=status.HTTP_200_OK)
    def put(self, request, pk):
        vender = get_object_or_404(Vendor, pk=pk)
        serializer = VendorSerializer(vender,data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        get_object_or_404(Vendor, pk=pk).delete()
        return Response(status=204)
    
 ### Category
 
class CategoryListCreateView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryDetailView(APIView):
    def get(self, request, pk):
        category = get_object_or_404(Category, pk=pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)  

### PRODUCTS ###
class ProductListCreateAPIView(APIView):
    permission_classes=[IsVendor,IsAuthenticated]
    def get(self, request):
        return Response(ProductSerializer(Product.objects.all(), many=True).data)
    def post(self, request):
        s = ProductSerializer(data=request.data)
        return Response(s.data, status=201) if s.is_valid() and s.save() else Response(s.errors, status=400)

class ProductDetailAPIView(APIView):
    permission_classes=[IsVendor,IsAuthenticated]
    def get(self, request, pk):
        product=get_object_or_404(Product, pk=pk)
        serializer=ProductSerializer(product)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def put(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        get_object_or_404(Product, pk=pk).delete()
        return Response(status=204)
    
class ProductVarientAPIView(APIView):
    
    permission_classes=[IsVendor,IsAuthenticated]
    
    def get(self, request):
        return Response(ProductVariantSerializer(ProductVariant.objects.all(), many=True).data)
    def post(self, request):
        s = ProductVariantSerializer(data=request.data)
        return Response(s.data, status=201) if s.is_valid() and s.save() else Response(s.errors, status=400)

class ProductVarientDetailAPIView(APIView):
    
    permission_classes=[IsVendor,IsAuthenticated]
    
    def get(self, request, pk):
        return Response(ProductVariantSerializer(get_object_or_404(ProductVariant, pk=pk)).data)
    def put(self, request, pk):
        p = get_object_or_404(ProductVariant, pk=pk)
        s = ProductVariantSerializer(p, data=request.data, partial=True)
        return Response(s.data) if s.is_valid() and s.save() else Response(s.errors, status=400)
    def delete(self, request, pk):
        get_object_or_404(ProductVariant, pk=pk).delete()
        return Response(status=204)
    
### ORDERS ###
class OrderListCreateAPIView(APIView):
    def get(self, request):
        return Response(OrderSerializer(Order.objects.all(), many=True).data)
    def post(self, request):
        s = OrderSerializer(data=request.data)
        return Response(s.data, status=201) if s.is_valid() and s.save() else Response(s.errors, status=400)

class OrderDetailAPIView(APIView):
    def get(self, request, pk):
        return Response(OrderSerializer(get_object_or_404(Order, pk=pk)).data)
    def put(self, request, pk):
        o = get_object_or_404(Order, pk=pk)
        s = OrderSerializer(o, data=request.data, partial=True)
        return Response(s.data) if s.is_valid() and s.save() else Response(s.errors, status=400)
    def delete(self, request, pk):
        get_object_or_404(Order, pk=pk).delete()
        return Response(status=204)

### ORDER ITEMS ###
class OrderItemAPIView(APIView):
    def get(self, request):
        return Response(OrderItemSerializer(OrderItem.objects.all(), many=True).data)
    def post(self, request):
        s = OrderItemSerializer(data=request.data)
        return Response(s.data, status=201) if s.is_valid() and s.save() else Response(s.errors, status=400)

### PAYMENTS ###
class PaymentAPIView(APIView):
    def get(self, request):
        return Response(PaymentSerializer(Payment.objects.all(), many=True).data)
    def post(self, request):
        s = PaymentSerializer(data=request.data)
        return Response(s.data, status=201) if s.is_valid() and s.save() else Response(s.errors, status=400)

### REVIEWS ###
class ReviewAPIView(APIView):
    def get(self, request):
        return Response(ReviewSerializer(Review.objects.all(), many=True).data)
    def post(self, request):
        s = ReviewSerializer(data=request.data)
        return Response(s.data, status=201) if s.is_valid() and s.save() else Response(s.errors, status=400)

### SHIPPING ###
class ShippingAddressAPIView(APIView):
    def get(self, request):
        return Response(ShippingAddressSerializer(ShippingAddress.objects.all(), many=True).data)
    def post(self, request):
        s = ShippingAddressSerializer(data=request.data)
        return Response(s.data, status=201) if s.is_valid() and s.save() else Response(s.errors, status=400)

### NOTIFICATIONS ###
class NotificationAPIView(APIView):
    def get(self, request):
        return Response(NotificationSerializer(Notification.objects.all(), many=True).data)
    def post(self, request):
        s = NotificationSerializer(data=request.data)
        return Response(s.data, status=201) if s.is_valid() and s.save() else Response(s.errors, status=400)

### WALLET ###
class WalletTransactionAPIView(APIView):
    def get(self, request):
        return Response(WalletTransactionSerializer(WalletTransaction.objects.all(), many=True).data)
    def post(self, request):
        s = WalletTransactionSerializer(data=request.data)
        return Response(s.data, status=201) if s.is_valid() and s.save() else Response(s.errors, status=400)

### WISHLIST ###
class WishlistAPIView(APIView):
    def get(self, request):
        return Response(WishlistSerializer(Wishlist.objects.all(), many=True).data)
    def post(self, request):
        s = WishlistSerializer(data=request.data)
        return Response(s.data, status=201) if s.is_valid() and s.save() else Response(s.errors, status=400)

### COUPONS ###
class CouponAPIView(APIView):
    def get(self, request):
        return Response(CouponSerializer(Coupon.objects.all(), many=True).data)
    def post(self, request):
        s = CouponSerializer(data=request.data)
        return Response(s.data, status=201) if s.is_valid() and s.save() else Response(s.errors, status=400)