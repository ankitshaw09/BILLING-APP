from django.contrib import admin
from .models import Customer

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('get_company_customer_id', 'name', 'company_name', 'company', 'phone_number', 'email', 'gst_number', 'created_by', 'created_at')
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
