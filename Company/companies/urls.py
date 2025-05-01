from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'(?P<company_id>\d+)/addresses/company', CompanyAddressViewSet, basename='company-address')
router.register(r'(?P<company_id>\d+)/addresses/billing', BillingAddressViewSet, basename='billing-address')
router.register(r'(?P<company_id>\d+)/addresses/shipping', ShippingAddressViewSet, basename='shipping-address')

router.register(r'(?P<company_id>\d+)/stamp', CompanyStampViewSet, basename='company-stamp')
router.register(r'(?P<company_id>\d+)/signature', CompanySignatureViewSet, basename='company-signature')

 

urlpatterns = [
    path('create-company/', CreateCompanyView.as_view(), name='create-company'),
    path('<int:pk>/profile/', CompanyProfileView.as_view(), name='company-profile'),
    path('companies-list/', CompanyListView.as_view(), name='company-list'),
    path('<int:company_id>/delete/', DeleteCompanyView.as_view(), name='delete-company'),

    # aditioanl fields
    path('<int:company_id>/additional-field/create/', AdditionalFieldCreateView.as_view(), name='additional-field-create'),
    path('<int:company_id>/additional-field/list/', AdditionalFieldListView.as_view(), name='additional-field-list'),
    path('<int:company_id>/additional-field/<int:field_id>/', AdditionalFieldDetailView.as_view(), name='additional-field-detail'),
    path(
        '<int:company_id>/additional-field/<int:field_id>/update/',
        AdditionalFieldUpdateView.as_view(),
        name='additional-field-update'
    ),
    path(
    '<int:company_id>/additional-field/<int:field_id>/delete/',
    AdditionalFieldDeleteView.as_view(),
    name='additional-field-delete'
),
]
 
urlpatterns += router.urls
 