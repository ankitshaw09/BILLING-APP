# companies/views.py
from .models import *
from .serializers import *
from rest_framework import status,viewsets,generics, permissions

from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError


class CreateCompanyView(generics.CreateAPIView):
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user
        if user.owned_companies.count() >= 3:  # ✅ Correct related_name
            return Response(
                {"error": "You can only create up to 3 companies."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CompanyProfileView(generics.RetrieveUpdateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return Company.objects.get(pk=self.kwargs["pk"], user=self.request.user)

class CompanyListView(ListAPIView):
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Company.objects.filter(user=self.request.user)

class DeleteCompanyView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, company_id):
        try:
            company = Company.objects.get(id=company_id, user=request.user)
        except Company.DoesNotExist:
            return Response(
                {"detail": "Company not found or not owned by user."},
                status=status.HTTP_404_NOT_FOUND,
            )

        company.delete()
        return Response(
            {"detail": "Company deleted successfully."},
            status=status.HTTP_204_NO_CONTENT,
        )

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
        company_id = self.kwargs["company_id"]
        return BillingAddress.objects.filter(company_id=company_id, company__user=self.request.user)

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
        company_id = self.kwargs["company_id"]
        return ShippingAddress.objects.filter(company_id=company_id, company__user=self.request.user)


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

class CompanyStampViewSet(viewsets.ModelViewSet):
    serializer_class = CompanyStampSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        company_id = self.kwargs['company_id']
        return CompanyStamp.objects.filter(company_id=company_id, company__user=self.request.user)

    def perform_create(self, serializer):
        company_id = self.request.data.get("company")
        company = Company.objects.get(id=company_id, user=self.request.user)

        if CompanyStamp.objects.filter(company=company).count() >= 5:
            raise ValidationError("A company can only have up to 5 stamps.")

        serializer.save(company=company)


class CompanySignatureViewSet(viewsets.ModelViewSet):
    serializer_class = CompanySignatureSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        company_id = self.kwargs['company_id']
        return CompanySignature.objects.filter(company_id=company_id, company__user=self.request.user)

    def perform_create(self, serializer):
        company_id = self.request.data.get("company")
        company = Company.objects.get(id=company_id, user=self.request.user)

        if CompanySignature.objects.filter(company=company).count() >= 2:
            raise ValidationError("A company can only have up to 2 signatures.")

        serializer.save(company=company)
 


from rest_framework import generics, permissions
from .models import AdditionalField
from .serializers import AdditionalFieldSerializer
from companies.models import Company

class AdditionalFieldCreateView(generics.CreateAPIView):
    serializer_class = AdditionalFieldSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        company_id = self.kwargs.get('company_id')
        company = Company.objects.get(id=company_id)
        serializer.save(company=company)

class AdditionalFieldDetailView(generics.RetrieveAPIView):
    serializer_class = AdditionalFieldSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        company_id = self.kwargs.get('company_id')
        field_id = self.kwargs.get('field_id')
        try:
            return AdditionalField.objects.get(id=field_id, company_id=company_id)
        except AdditionalField.DoesNotExist:
            raise NotFound("Additional field not found")

class AdditionalFieldListView(generics.ListAPIView):
    serializer_class = AdditionalFieldSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        company_id = self.kwargs.get('company_id')
        return AdditionalField.objects.filter(company_id=company_id)

from rest_framework import generics, permissions
from .models import AdditionalField
from .serializers import AdditionalFieldSerializer
from rest_framework.exceptions import NotFound

class AdditionalFieldUpdateView(generics.UpdateAPIView):
    serializer_class = AdditionalFieldSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        company_id = self.kwargs.get('company_id')
        field_id = self.kwargs.get('field_id')

        try:
            return AdditionalField.objects.get(id=field_id, company_id=company_id)
        except AdditionalField.DoesNotExist:
            raise NotFound("Additional field not found")

    def perform_update(self, serializer):
        serializer.save()

from rest_framework import generics, permissions
from .models import AdditionalField
from rest_framework.exceptions import NotFound

class AdditionalFieldDeleteView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        company_id = self.kwargs.get('company_id')
        field_id = self.kwargs.get('field_id')
        try:
            return AdditionalField.objects.get(id=field_id, company_id=company_id)
        except AdditionalField.DoesNotExist:
            raise NotFound("Additional field not found")
