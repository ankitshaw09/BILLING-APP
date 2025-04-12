# company/views.py

from rest_framework import generics, permissions
from .models import *
from .serializers import CompanySerializer

class CompanyCreateView(generics.CreateAPIView):
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]

class CompanyUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # restrict to companies related to current user
        return self.request.user.companies.all()
