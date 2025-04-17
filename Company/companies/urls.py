from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'(?P<company_id>\d+)/addresses/company', CompanyAddressViewSet, basename='company-address')
router.register(r'(?P<company_id>\d+)/addresses/billing', BillingAddressViewSet, basename='billing-address')
router.register(r'(?P<company_id>\d+)/addresses/shipping', ShippingAddressViewSet, basename='shipping-address')

router.register(r'stamps', CompanyStampViewSet, basename='company-stamps')
router.register(r'signatures', CompanySignatureViewSet, basename='company-signatures')

urlpatterns = [
    path('create-company/', CreateCompanyView.as_view(), name='create-company'),
    path('<int:pk>/profile/', CompanyProfileView.as_view(), name='company-profile'),
    path('companies-list/', CompanyListView.as_view(), name='company-list'),
    path('<int:company_id>/delete/', DeleteCompanyView.as_view(), name='delete-company'),
]

urlpatterns += router.urls
