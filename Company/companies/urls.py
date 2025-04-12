# company/urls.py

from django.urls import path
from .views import CompanyCreateView, CompanyUpdateView

urlpatterns = [
    path('create/', CompanyCreateView.as_view(), name='create-company'),
    path('update/<int:pk>/', CompanyUpdateView.as_view(), name='update-company'),
]
