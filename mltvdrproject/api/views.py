from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAuthenticatedOrReadOnly
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
 

class CategoryList(APIView):
    def get(self, request):
        categories = Category.objects.filter(parent__isnull=True).prefetch_related('subcategories') 
        serializer = CategoriesSerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CategoryListCreateView(APIView):

    def get(self, request, category_name):
        category = get_object_or_404(Category, name__icontains=category_name)
        subcategories = Category.objects.filter(parent=category)
        products = Product.objects.filter(Q(category=category) | Q(category__in=subcategories))

        serializer = ProductSerializer(products, many=True)
        return Response({
            "category": category.name,
            "products": serializer.data
        })

    def post(self, request):
        data = request.data
        is_bulk = isinstance(data, list)
        serializer = CategorySerializer(data=data, many=is_bulk)

        if serializer.is_valid():
            serializer.save()
            if is_bulk:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryDetailView(APIView):
    def get(self, request, pk):
        category = get_object_or_404(Category, pk=pk)
        subcategories = Category.objects.filter(parent=category)
        products = Product.objects.filter(Q(category=category) | Q(category__in=subcategories))

        serializer = ProductSerializer(products, many=True)
        return Response({
            "category": category.name,
            "products": serializer.data
        })  

### PRODUCTS ###
class ProductListCreateAPIView(APIView):
    permission_classes = [AllowAny,IsAuthenticatedOrReadOnly]
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            vendor = request.user.vendor
        except Vendor.DoesNotExist:
            return Response({"detail": "User is not a vendor."}, status=status.HTTP_403_FORBIDDEN)
        data = request.data
        is_bulk = isinstance(data, list)
        serializer = ProductSerializer(data=data, many=is_bulk)

        if serializer.is_valid():
            serializer.save(vendor=vendor)
            if is_bulk:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDetailAPIView(APIView):
    permission_classes=[AllowAny]
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

class ProductVariantAPIView(APIView):
    permission_classes = [IsVendor, IsAuthenticated]

    def get(self, request):
        try:
            vendor = request.user.vendor
        except Vendor.DoesNotExist:
            return Response({"detail": "User is not a vendor."}, status=status.HTTP_403_FORBIDDEN)
        
        products = Product.objects.filter(vendor=vendor)
        product_variants = ProductVariant.objects.filter(product__in=products)
        serializer = ProductVariantSerializer(product_variants, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            vendor = request.user.vendor
        except Vendor.DoesNotExist:
            return Response({"detail": "User is not a vendor."}, status=status.HTTP_403_FORBIDDEN)

        data = request.data
        is_bulk = isinstance(data, list)
        if not is_bulk:
            product_id = data.get('product')  
            try:
                product = Product.objects.get(id=product_id, vendor=vendor)
            except Product.DoesNotExist:
                return Response({"detail": "Product does not belong to this vendor."}, status=status.HTTP_400_BAD_REQUEST)
            
            data['product'] = product.id 
        
        serializer = ProductVariantSerializer(data=data, many=is_bulk)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductVarientDetailAPIView(APIView):
    permission_classes=[IsVendor,IsAuthenticated]
    
    def get(self, request, pk):
        variant=get_object_or_404(ProductVariant, pk=pk)
        serializer=ProductVariantSerializer(variant,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def put(self, request, pk):
        product = get_object_or_404(ProductVariant, pk=pk)
        serializer = ProductVariantSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        get_object_or_404(ProductVariant, pk=pk).delete()
        return Response(status=204)

class CartListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        carts = Cart.objects.filter(user=request.user)
        serializer = CartSerializer(carts, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CartSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CartDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        try:
            return Cart.objects.get(pk=pk, user=user)
        except Cart.DoesNotExist:
            return None

    def get(self, request, pk):
        cart = self.get_object(pk, request.user)
        if not cart:
            return Response({"detail": "Cart not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def put(self, request, pk):
        cart = self.get_object(pk, request.user)
        if not cart:
            return Response({"detail": "Cart not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = CartSerializer(cart, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        cart = self.get_object(pk, request.user)
        if not cart:
            return Response({"detail": "Cart not found."}, status=status.HTTP_404_NOT_FOUND)
        cart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CartItemListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart_items = CartItem.objects.filter(cart__user=request.user)
        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        try:
            cart = Cart.objects.get(user=request.user, is_active=True)
        except Cart.DoesNotExist:
            return Response({"detail": "Active cart not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cart=cart)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CartItemDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        try:
            return CartItem.objects.get(pk=pk, cart__user=user)
        except CartItem.DoesNotExist:
            return None

    def get(self, request, pk):
        item = self.get_object(pk, request.user)
        if not item:
            return Response({"detail": "Cart item not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = CartItemSerializer(item)
        return Response(serializer.data)

    def put(self, request, pk):
        item = self.get_object(pk, request.user)
        if not item:
            return Response({"detail": "Cart item not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = CartItemSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        item = self.get_object(pk, request.user)
        if not item:
            return Response({"detail": "Cart item not found."}, status=status.HTTP_404_NOT_FOUND)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    
#ORDERS
class OrderListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(customer=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(customer=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        try:
            return Order.objects.get(pk=pk, customer=user)
        except Order.DoesNotExist:
            return None

    def get(self, request, pk):
        order = self.get_object(pk, request.user)
        if not order:
            return Response({"detail": "Order not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def put(self, request, pk):
        order = self.get_object(pk, request.user)
        if not order:
            return Response({"detail": "Order not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = OrderSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        order = self.get_object(pk, request.user)
        if not order:
            return Response({"detail": "Order not found."}, status=status.HTTP_404_NOT_FOUND)
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class OrderStatusUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            order = Order.objects.get(pk=pk, customer=request.user)
        except Order.DoesNotExist:
            return Response({"detail": "Order not found."}, status=status.HTTP_404_NOT_FOUND)

        status_value = request.data.get('status')
        if status_value not in dict(Order.STATUS_CHOICES):
            return Response({"detail": "Invalid status."}, status=status.HTTP_400_BAD_REQUEST)

        order.status = status_value
        order.save()
        return Response(OrderSerializer(order).data)


### ORDER ITEMS ###
class OrderItemListCreateView(APIView):
    permission_classes = [IsCustomer,IsAuthenticated]

    def get(self, request):
        order_items = OrderItem.objects.filter(order__customer=request.user)
        serializer = OrderItemSerializer(order_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = OrderItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderItemDetailView(APIView):
    permission_classes = [IsCustomer,IsAuthenticated]

    def get_object(self, pk, user):
        try:
            return OrderItem.objects.get(pk=pk, order__customer=user)
        except OrderItem.DoesNotExist:
            return None

    def get(self, request, pk):
        item = self.get_object(pk, request.user)
        if not item:
            return Response({"detail": "Order item not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = OrderItemSerializer(item)
        return Response(serializer.data)

    def put(self, request, pk):
        item = self.get_object(pk, request.user)
        if not item:
            return Response({"detail": "Order item not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = OrderItemSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        item = self.get_object(pk, request.user)
        if not item:
            return Response({"detail": "Order item not found."}, status=status.HTTP_404_NOT_FOUND)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

### PAYMENTS ###
class PaymentAPIView(APIView):
    permission_classes=[IsCustomer,IsAuthenticated]
    def get(self, request):
        payments = Payment.objects.all()
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        print(data)  # Log the incoming data

        # Ensure the required fields are present
        items = data.get('items', [])
        total = data.get('total')  # Make sure 'total' is being passed
        method = data.get('method')
        amount = data.get('amount')

        if not items:
            return Response({"error": "Missing 'items' field."}, status=status.HTTP_400_BAD_REQUEST)
        if not total:
            return Response({"error": "Missing 'total' field."}, status=status.HTTP_400_BAD_REQUEST)
        if not method:
            return Response({"error": "Missing 'method' field."}, status=status.HTTP_400_BAD_REQUEST)

        if method not in ['cash', 'credit_card', 'upi']:
            return Response(
                {"success": False, "error": "Invalid payment method."},
                status=status.HTTP_400_BAD_REQUEST
            )

        order = Order.objects.create(
            customer=request.user,
            status='Pending',
        )

        first_product_id = items[0].get('id') if items else None
        try:
            product = Product.objects.get(id=first_product_id)
            vendor = product.vendor
        except Product.DoesNotExist:
            return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)
        except AttributeError:
            return Response({"error": "Vendor not found from product."}, status=status.HTTP_400_BAD_REQUEST)

        for item in items:
            product_id = item.get('id')
            quantity = item.get('quantity')

            try:
                product = Product.objects.get(id=product_id)
            except Product.DoesNotExist:
                return Response(
                    {"success": False, "error": f"Product with id {product_id} not found."},
                    status=status.HTTP_404_NOT_FOUND
                )

            OrderItem.objects.create(order=order, product=product, quantity=quantity)

        payment = Payment.objects.create(
            order=order,
            vendor=vendor,
            amount=amount,
            method=method,
        )

        serializer = PaymentSerializer(payment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

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
