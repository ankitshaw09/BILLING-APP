from rest_framework import generics, permissions
from .models import Product
from .serializers import ProductSerializer

class ProductCreateView(generics.CreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        company_id = self.kwargs.get('company_id')
        serializer.save(company_id=company_id)

class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        company_id = self.kwargs.get('company_id')
        return Product.objects.filter(company_id=company_id)
