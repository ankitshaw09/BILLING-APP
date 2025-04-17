# companies/admin.py

from django.contrib import admin
from .models import *

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ['trade_name', 'proprietor_name', 'company_email', 'user']
    search_fields = ['trade_name', 'proprietor_name', 'company_email']
    list_filter = ['created_at']

@admin.register(CompanyAddress)
class CompanyAddressAdmin(admin.ModelAdmin):
    list_display = ['name', 'city', 'state', 'company']

@admin.register(BillingAddress)
class BillingAddressAdmin(admin.ModelAdmin):
    list_display = ['name', 'city', 'state', 'company']

@admin.register(ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = ['name', 'city', 'state', 'company']


@admin.register(CompanyStamp)
class CompanyStampAdmin(admin.ModelAdmin):
    list_display = ('id', 'company', 'name', 'stamp_image')
    search_fields = ('name', 'company__trade_name')
    list_filter = ('company',)


@admin.register(CompanySignature)
class CompanySignatureAdmin(admin.ModelAdmin):
    list_display = ('id', 'company', 'name', 'signature_image')
    search_fields = ('name', 'company__trade_name')
    list_filter = ('company',)