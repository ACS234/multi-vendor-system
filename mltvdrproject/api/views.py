from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import *
from .serializers import *




class VendorListCreateAPIView(APIView):
    def get(self, request):
        verders=Vendor.objects.all()
        serializer=VendorSerializer(verders,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    def post(self, request):
        serializer = VendorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

class VendorDetailAPIView(APIView):
    def get(self, request, pk):
        return Response(VendorSerializer(get_object_or_404(Vendor, pk=pk)).data)
    def put(self, request, pk):
        v = get_object_or_404(Vendor, pk=pk)
        s = VendorSerializer(v, data=request.data, partial=True)
        return Response(s.data) if s.is_valid() and s.save() else Response(s.errors, status=400)
    def delete(self, request, pk):
        get_object_or_404(Vendor, pk=pk).delete()
        return Response(status=204)

### PRODUCTS ###
class ProductListCreateAPIView(APIView):
    def get(self, request):
        return Response(ProductSerializer(Product.objects.all(), many=True).data)
    def post(self, request):
        s = ProductSerializer(data=request.data)
        return Response(s.data, status=201) if s.is_valid() and s.save() else Response(s.errors, status=400)

class ProductDetailAPIView(APIView):
    def get(self, request, pk):
        return Response(ProductSerializer(get_object_or_404(Product, pk=pk)).data)
    def put(self, request, pk):
        p = get_object_or_404(Product, pk=pk)
        s = ProductSerializer(p, data=request.data, partial=True)
        return Response(s.data) if s.is_valid() and s.save() else Response(s.errors, status=400)
    def delete(self, request, pk):
        get_object_or_404(Product, pk=pk).delete()
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
