from django.contrib import admin
from .models import *

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('id','get_company_customer_id', 'name', 'company_name', 'company', 'phone_number', 'email', 'gst_number', 'created_by', 'created_at')
    list_filter = ('company',)
    search_fields = ('name', 'company_name', 'email', 'gst_number', 'phone_number')
    list_per_page = 25
    ordering = ('company', 'id')
     
    fieldsets = (
        ('Basic Information', {
            'fields': ('company', 'name', 'company_name')
        }),
        ('Contact Information', {
            'fields': ('phone_number', 'email')
        }),
        ('Tax Information', {
            'fields': ('gst_number',)
        }),
        ('Creation Information', {
            'fields': ('created_by', 'created_at')
        }),
    )
    
    def get_company_customer_id(self, obj):
        """Get the company-specific customer ID"""
        customers = Customer.objects.filter(company=obj.company).order_by('id')
        for index, customer in enumerate(customers, 1):
            if customer.id == obj.id:
                return index
        return None
    get_company_customer_id.short_description = 'Customer ID'
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('company')




@admin.register(BillingAddress)
class BillingAddressAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'customer__id','customer', 'name', 'address_line_1', 'city', 'state', 'country'
    )
    list_filter = ('customer__company', 'city', 'state', 'country')
    search_fields = ('customer__name', 'name', 'address_line_1', 'city', 'state', 'pincode')
    list_per_page = 25
    ordering = ('customer__company', 'customer__id')

    fieldsets = (
        ('Customer', {
            'fields': ('customer',)
        }),
        ('Address Details', {
            'fields': ('name', 'address_line_1', 'address_line_2', 'pincode', 'city', 'state', 'country')
        }),
    )


@admin.register(ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'customer', 'name', 'address_line_1', 'city', 'state', 'country', 'is_default'
    )
    list_filter = ('is_default', 'customer__company', 'city', 'state', 'country')
    search_fields = ('customer__name', 'name', 'address_line_1', 'city', 'state', 'pincode')
    list_per_page = 25
    ordering = ('customer__company', 'customer__id', '-is_default')

    fieldsets = (
        ('Customer', {
            'fields': ('customer',)
        }),
        ('Address Details', {
            'fields': ('name', 'address_line_1', 'address_line_2', 'pincode', 'city', 'state', 'country')
        }),
        ('Defaults', {
            'fields': ('is_default',)
        }),
    )
