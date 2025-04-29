from django.urls import path
from .views import *

urlpatterns = [
    path('<int:company_id>/create/', CustomerCreateView.as_view(), name='customer-create'),
    path('<int:company_id>/list/', CustomerListView.as_view(), name='customer-list'),
    path('<int:company_id>/<int:customer_id>/', CustomerDetailView.as_view(), name='customer-detail'),
    path('<int:company_id>/<int:customer_id>/update/', CustomerUpdateView.as_view(), name='customer-update'),
    path('<int:company_id>/<int:customer_id>/delete/', CustomerDeleteView.as_view(), name='customer-delete'),
] 
 