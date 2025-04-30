from django.urls import path
from .views import *

urlpatterns = [
    # Customer URLs
    path('<int:company_id>/create/', CustomerCreateView.as_view(), name='customer-create'),
    path('<int:company_id>/list/', CustomerListView.as_view(), name='customer-list'),
    path('<int:company_id>/<int:customer_id>/', CustomerDetailView.as_view(), name='customer-detail'),
    path('<int:company_id>/<int:customer_id>/update/', CustomerUpdateView.as_view(), name='customer-update'),
    path('<int:company_id>/<int:customer_id>/delete/', CustomerDeleteView.as_view(), name='customer-delete'),
    
    # Billing Address URLs
    path('<int:company_id>/<int:customer_id>/billing-address/create/', 
         BillingAddressCreateView.as_view(), name='billing-address-create'),
    path('<int:company_id>/<int:customer_id>/billing-address/', 
         BillingAddressDetailView.as_view(), name='billing-address-detail'),
    
    # Shipping Address URLs
    path('<int:company_id>/<int:customer_id>/shipping-address/create/', 
         ShippingAddressCreateView.as_view(), name='shipping-address-create'),
    # path('<int:company_id>/<int:customer_id>/shipping-address/list/', 
    #      ShippingAddressListView.as_view(), name='shipping-address-list'),
    path('<int:company_id>/<int:customer_id>/shipping-address/', 
         ShippingAddressDetailView.as_view(), name='shipping-address-detail'),
] 
 