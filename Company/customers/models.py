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


class BaseAddress(models.Model):
    name = models.CharField(max_length=255, help_text="Name of the address (e.g., 'Main Office', 'Warehouse')")
    address_line_1 = models.CharField(max_length=255, help_text="Street address, P.O. box, company name")
    address_line_2 = models.CharField(max_length=255, blank=True, null=True, help_text="Apartment, suite, unit, building, floor, etc.")
    pincode = models.CharField(max_length=10, help_text="Postal/ZIP code")
    city = models.CharField(max_length=100, help_text="City/Town")
    state = models.CharField(max_length=100, help_text="State/Province/Region")
    country = models.CharField(max_length=100, default='India', help_text="Country")

    class Meta: 
        abstract = True

    def __str__(self):
        return f"{self.name} - {self.address_line_1}, {self.city}"


class BillingAddress(BaseAddress):
    customer = models.OneToOneField(
        Customer,
        on_delete=models.CASCADE,
        related_name='billing_address',
        help_text="Customer this billing address belongs to"
    )

    class Meta:
        verbose_name = "Billing Address"
        verbose_name_plural = "Billing Addresses"


class ShippingAddress(BaseAddress):
    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name='shipping_addresses',
        help_text="Customer this shipping address belongs to"
    )
    is_default = models.BooleanField(
        default=False,
        help_text="Whether this is the default shipping address for the customer"
    )

    class Meta:
        verbose_name = "Shipping Address"
        verbose_name_plural = "Shipping Addresses"
        ordering = ['-is_default', 'name']

    def save(self, *args, **kwargs):
        # If this is being set as default, unset all other defaults for this customer
        if self.is_default:
            ShippingAddress.objects.filter(
                customer=self.customer,
                is_default=True
            ).exclude(id=self.id).update(is_default=False)
        super().save(*args, **kwargs)