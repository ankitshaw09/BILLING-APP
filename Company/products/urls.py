from django.urls import path
from .views import ProductCreateView, ProductListView

urlpatterns = [
    path('<int:company_id>/products/create/', ProductCreateView.as_view(), name='product-create'),
    path('<int:company_id>/products/', ProductListView.as_view(), name='product-list'),
]
