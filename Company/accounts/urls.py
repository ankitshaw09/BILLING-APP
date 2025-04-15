from django.urls import path
from .views import *

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path('profile/', UserProfileView.as_view(), name='profile'),

    path('logout/', LogoutView.as_view(), name='logout'),
    path('logout-all/', LogoutAllDevicesView.as_view(), name='logout-all'),

    path('request-delete/', DeleteAccountRequestView.as_view(), name='request-delete'),
]
