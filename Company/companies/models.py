# company/models.py

from django.db import models
from django.conf import settings

class Company(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='owned_companies')
    company_logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)
    trade_name = models.CharField(max_length=255)  # Mandatory
    proprietor_name = models.CharField(max_length=255)  # Mandatory
    company_phone_no = models.CharField(max_length=20)  # Mandatory
    alternate_phone_no = models.CharField(max_length=20, blank=True, null=True)
    company_email = models.EmailField()  # Mandatory
    alternate_email = models.EmailField(blank=True, null=True)
    gst_number = models.CharField(max_length=20, blank=True, null=True)
    pan_number = models.CharField(max_length=20, blank=True, null=True)
    website = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.trade_name

class BaseAddress(models.Model):
    name = models.CharField(max_length=255)
    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255, blank=True, null=True)
    pincode = models.CharField(max_length=10)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100, default='India')

    class Meta: 
        abstract = True


class CompanyAddress(BaseAddress):
    company = models.OneToOneField(Company, on_delete=models.CASCADE, related_name='company_address')

    def __str__(self):
        return f"{self.company.trade_name} - Company Address"

class BillingAddress(BaseAddress):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='billing_addresses')

    def __str__(self):
        return f"{self.company.trade_name} - Billing Address"

class ShippingAddress(BaseAddress):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='shipping_addresses')

    def __str__(self):
        return f"{self.company.trade_name} - Shipping Address"

class CompanyStamp(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='stamps')
    name = models.CharField(max_length=100)
    stamp_image = models.ImageField(upload_to='company_stamps/')

    def __str__(self):
        return f"{self.company.trade_name} - {self.name}"

class CompanySignature(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='signatures')
    name = models.CharField(max_length=100)
    signature_image = models.ImageField(upload_to='company_signatures/')

    def __str__(self):
        return f"{self.company.trade_name} - {self.name}"



