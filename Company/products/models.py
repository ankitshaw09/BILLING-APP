from django.db import models
from companies.models import Company


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    UNIT_CHOICES = [
        ('oth', 'Others'),
        ('pcs', 'Pieces'),
        ('nos', 'Numbers'),
        ('kgs', 'Kilogram'),
        ('unt', 'Unit'),
        ('box', 'Box'),
        ('pac', 'Packs'),
        ('each', 'Each'),
    ]

    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    selling_price_with_tax = models.DecimalField(max_digits=10, decimal_places=2 ,blank=True, null=True)
    tax_percent = models.DecimalField(max_digits=5, decimal_places=2, default=0 ,blank=True, null=True)
    unit = models.CharField(max_length=10, choices=UNIT_CHOICES)
    hsn_sac = models.CharField(max_length=50, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    barcode = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
