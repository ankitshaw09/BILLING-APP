
from rest_framework import serializers
from .models import Company

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        exclude = ['user', 'created_at']  # user will be set in the view




# companies/serializers.py

from .models import CompanyAddress, BillingAddress, ShippingAddress

class CompanyAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyAddress
        exclude = ['company']

class BillingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillingAddress
        exclude = ['company']

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        exclude = ['company']



# serializers.py

from rest_framework import serializers
from .models import CompanyStamp, CompanySignature

class CompanyStampSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyStamp
        fields = '__all__'


class CompanySignatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanySignature
        fields = '__all__'
