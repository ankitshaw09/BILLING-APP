
from rest_framework import serializers
from .models import *

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        exclude = ['user', 'created_at']  # user will be set in the view

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

class CompanyStampSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyStamp
        fields = '__all__'

class CompanySignatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanySignature
        fields = '__all__'
 
  


from rest_framework import serializers
from .models import AdditionalField

class AdditionalFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdditionalField
        fields = ['id', 'company', 'label', 'value']
        extra_kwargs = {
            'company': {'write_only': True}
        }
