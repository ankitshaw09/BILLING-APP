from rest_framework import generics, permissions, status
# from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from django.db.models import Q
from .models import *
from .serializers import *
from companies.models import Company
from rest_framework.permissions import IsAuthenticated


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




class BillingAddressCreateView(generics.CreateAPIView):
    serializer_class = BillingAddressSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        company_id = self.kwargs.get('company_id')
        customer_id = self.kwargs.get('customer_id')

        # Fetch customer using the company and customer IDs
        try:
            customer = Customer.objects.get(company_id=company_id, id=customer_id)
        except Customer.DoesNotExist:
            raise NotFound("Customer not found")

        # Save the billing address with the customer
        serializer.save(customer=customer)



class BillingAddressDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BillingAddressSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        company_id = self.kwargs.get('company_id')
        customer_id = self.kwargs.get('customer_id')

        # Ensure the customer exists
        try:
            customer = Customer.objects.get(id=customer_id, company_id=company_id)
        except Customer.DoesNotExist:
            raise NotFound("Customer not found")

        # Check if the customer has a billing address
        try:
            billing_address = BillingAddress.objects.get(customer=customer)
            return billing_address
        except BillingAddress.DoesNotExist:
            raise NotFound("Billing address not found for this customer")

    def perform_update(self, serializer):
        # Save the updated billing address (partial updates)
        serializer.save()


class ShippingAddressCreateView(generics.CreateAPIView):
    serializer_class = ShippingAddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        company_id = self.kwargs.get('company_id')
        customer_id = self.kwargs.get('customer_id')
        
        # Get the customer
        customer = Customer.objects.get(company_id=company_id, id=customer_id)
        serializer.save(customer=customer)


# class ShippingAddressListView(generics.ListAPIView):
#     serializer_class = ShippingAddressSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         company_id = self.kwargs.get('company_id')
#         customer_id = self.kwargs.get('customer_id')
#         return ShippingAddress.objects.filter(
#             customer__company_id=company_id,
#             customer_id=customer_id
#         ).order_by('-is_default', 'name')



class ShippingAddressDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ShippingAddressSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        company_id = self.kwargs.get('company_id')
        customer_id = self.kwargs.get('customer_id')

        # Ensure the customer exists
        try:
            customer = Customer.objects.get(id=customer_id, company_id=company_id)
        except Customer.DoesNotExist:
            raise NotFound("Customer not found")

        # Check if the customer has a shipping address
        try:
            shipping_address = ShippingAddress.objects.get(customer=customer)
            return shipping_address
        except ShippingAddress.DoesNotExist:
            raise NotFound("Shipping address not found for this customer")

    def perform_update(self, serializer):
        # Save the updated shipping address (partial updates)
        serializer.save()


# views.py
# views.py

from rest_framework import generics, permissions
from .models import Customer, OpeningBalance
from .serializers import OpeningBalanceSerializer
from rest_framework.exceptions import NotFound

class OpeningBalanceCreateView(generics.CreateAPIView):
    serializer_class = OpeningBalanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        company_id = self.kwargs.get('company_id')
        customer_index = int(self.kwargs.get('customer_id'))

        customers = Customer.objects.filter(company_id=company_id).order_by('id')
        try:
            customer = list(customers)[customer_index - 1]
        except IndexError:
            raise NotFound("Customer not found")

        if hasattr(customer, 'opening_balance'):
            raise NotFound("Opening balance already exists for this customer")

        serializer.save(customer=customer)


class OpeningBalanceDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = OpeningBalanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        company_id = self.kwargs.get('company_id')
        customer_index = int(self.kwargs.get('customer_id'))

        customers = Customer.objects.filter(company_id=company_id).order_by('id')
        try:
            customer = list(customers)[customer_index - 1]
        except IndexError:
            raise NotFound("Customer not found")

        try:
            return customer.opening_balance
        except OpeningBalance.DoesNotExist:
            raise NotFound("Opening balance not found")
