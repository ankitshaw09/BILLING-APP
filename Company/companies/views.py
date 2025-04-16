# companies/views.py

from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import Company
from .serializers import CompanySerializer


class CreateCompanyView(generics.CreateAPIView):
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user
        if user.companies.count() >= 3:
            return Response(
                {"error": "You can only create up to 3 companies."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# companies/views.py

from rest_framework import generics, permissions
from .models import Company
from .serializers import CompanySerializer


class CompanyProfileView(generics.RetrieveUpdateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return Company.objects.get(pk=self.kwargs["pk"], user=self.request.user)


from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from companies.models import Company
from companies.serializers import CompanySerializer

class CompanyListView(ListAPIView):
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Company.objects.filter(user=self.request.user)


from rest_framework.exceptions import ValidationError
from companies.models import Company, BillingAddress, ShippingAddress

# companies/views.py

from rest_framework import viewsets
from .models import CompanyAddress, BillingAddress, ShippingAddress
from .serializers import (
    CompanyAddressSerializer,
    BillingAddressSerializer,
    ShippingAddressSerializer,
)
from rest_framework.permissions import IsAuthenticated


class CompanyAddressViewSet(viewsets.ModelViewSet):
    serializer_class = CompanyAddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        company_id = self.kwargs.get("company_id")
        return CompanyAddress.objects.filter(company__id=company_id)

    def perform_create(self, serializer):
        company_id = self.kwargs.get("company_id")
        company = Company.objects.get(id=company_id)

        if hasattr(company, "company_address"):
            raise ValidationError("Company already has a company address.")

        serializer.save(company=company)


class BillingAddressViewSet(viewsets.ModelViewSet):
    serializer_class = BillingAddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return BillingAddress.objects.filter(company__user=self.request.user)

    def perform_create(self, serializer):
        company_id = self.kwargs["company_id"]
        company = Company.objects.get(id=company_id)

        if BillingAddress.objects.filter(company=company).count() >= 2:
            raise ValidationError("Only 2 billing addresses are allowed per company.")

        serializer.save(company=company)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": "Billing address deleted successfully."},
            status=status.HTTP_204_NO_CONTENT,
        )


class ShippingAddressViewSet(viewsets.ModelViewSet):
    serializer_class = ShippingAddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ShippingAddress.objects.filter(company__user=self.request.user)

    def perform_create(self, serializer):
        company_id = self.kwargs["company_id"]
        company = Company.objects.get(id=company_id)

        if ShippingAddress.objects.filter(company=company).count() >= 2:
            raise ValidationError("Only 2 shipping addresses are allowed per company.")

        serializer.save(company=company)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": "Shipping address deleted successfully."},
            status=status.HTTP_204_NO_CONTENT,
        )


# views.py

from rest_framework import viewsets, permissions
from rest_framework.exceptions import ValidationError
from .models import CompanyStamp, CompanySignature, Company
from .serializers import CompanyStampSerializer, CompanySignatureSerializer


class CompanyStampViewSet(viewsets.ModelViewSet):
    serializer_class = CompanyStampSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CompanyStamp.objects.filter(company__user=self.request.user)

    def perform_create(self, serializer):
        company_id = self.request.data.get('company')
        company = Company.objects.get(id=company_id, user=self.request.user)

        if CompanyStamp.objects.filter(company=company).count() >= 5:
            raise ValidationError("A company can only have up to 5 stamps.")

        serializer.save(company=company)


class CompanySignatureViewSet(viewsets.ModelViewSet):
    serializer_class = CompanySignatureSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CompanySignature.objects.filter(company__user=self.request.user)

    def perform_create(self, serializer):
        company_id = self.request.data.get('company')
        company = Company.objects.get(id=company_id, user=self.request.user)

        if CompanySignature.objects.filter(company=company).count() >= 2:
            raise ValidationError("A company can only have up to 2 signatures.")

        serializer.save(company=company)
