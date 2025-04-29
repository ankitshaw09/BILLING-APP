from django.db import models
from django.conf import settings
from companies.models import Company
from django.db.models import Max
from django.utils import timezone


class Customer(models.Model):
    # The company this customer belongs to (user's company)
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name="customers"
    )

    # Customer's personal information
    name = models.CharField(max_length=255, help_text="Customer's full name")

    # Customer's company information (all optional)
    company_name = models.CharField(max_length=255, blank=True, null=True, help_text="Customer's company name")
    phone_number = models.CharField(
        max_length=15, blank=True, null=True, help_text="Customer's phone number"
    )
    email = models.EmailField(
        blank=True, null=True, help_text="Customer's email address"
    )
    gst_number = models.CharField(
        max_length=15, blank=True, null=True, help_text="Customer's GST number"
    )

    created_by = models.CharField(max_length=255, blank=True, null=True, help_text="Name of the company proprietor who created this customer")
    created_at = models.DateTimeField(default=timezone.now, help_text="Date and time when this customer was created")

    @property
    def company_customer_id(self):
        """Returns the customer's ID within their company"""
        # Get all customers for this company ordered by ID
        customers = Customer.objects.filter(company=self.company).order_by("id")
        # Find the position of this customer in the list
        for index, customer in enumerate(customers, 1):
            if customer.id == self.id:
                return index
        return None

    def __str__(self):
        return (
            f"{self.name} - {self.company_name or 'No Company'} (Customer of {self.company.trade_name})"
        )
    # pass
