# company/models.py

from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=255)
    trade_name = models.CharField(max_length=255, blank=True, null=True)
    proprietor_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    gst_number = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True)
    logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
