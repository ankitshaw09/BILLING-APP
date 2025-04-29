from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from django.db.models import Q
from .models import Customer
from .serializers import CustomerSerializer
from companies.models import Company

class CustomerCreateView(generics.CreateAPIView):
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        company_id = self.kwargs.get('company_id')
        # Get the company to access the proprietor name
        company = Company.objects.get(id=company_id)
        # Save with the company ID and the proprietor name
        serializer.save(company_id=company_id, created_by=company.proprietor_name)

class CustomerDetailView(generics.RetrieveAPIView):
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = 'customer_id'

    def get_object(self):
        company_id = self.kwargs.get('company_id')
        customer_id = self.kwargs.get('customer_id')
        
        # Get all customers for this company ordered by ID
        customers = Customer.objects.filter(company_id=company_id).order_by('id')
        
        # Find the customer with the specified customer_id
        for index, customer in enumerate(customers, 1):
            if index == int(customer_id):
                return customer
                
        raise NotFound("Customer not found")

class CustomerListView(generics.ListAPIView):
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        company_id = self.kwargs.get('company_id')
        return Customer.objects.filter(company_id=company_id).order_by('id')

class CustomerUpdateView(generics.UpdateAPIView):
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = 'customer_id'

    def get_object(self):
        company_id = self.kwargs.get('company_id')
        customer_id = self.kwargs.get('customer_id')
        
        # Get all customers for this company ordered by ID
        customers = Customer.objects.filter(company_id=company_id).order_by('id')
        
        # Find the customer with the specified customer_id
        for index, customer in enumerate(customers, 1):
            if index == int(customer_id):
                return customer
                
        raise NotFound("Customer not found")

class CustomerDeleteView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = 'customer_id'

    def get_object(self):
        company_id = self.kwargs.get('company_id')
        customer_id = self.kwargs.get('customer_id')
        
        # Get all customers for this company ordered by ID
        customers = Customer.objects.filter(company_id=company_id).order_by('id')
        
        # Find the customer with the specified customer_id
        for index, customer in enumerate(customers, 1):
            if index == int(customer_id):
                return customer
                
        raise NotFound("Customer not found")
