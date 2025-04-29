from rest_framework import serializers
from .models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    customer_id = serializers.IntegerField(read_only=True, source='company_customer_id')
    
    class Meta:
        model = Customer
        fields = ['id', 'customer_id', 'company', 'name', 'company_name', 'phone_number', 'email', 'gst_number', 'created_by', 'created_at']
        extra_kwargs = {
            'company_name': {'required': False, 'allow_blank': True},
            'phone_number': {'required': False, 'allow_blank': True},
            'email': {'required': False, 'allow_blank': True},
            'gst_number': {'required': False, 'allow_blank': True},
            'created_by': {'read_only': True},
            'created_at': {'read_only': True},
        }
    
    def validate(self, data):
        # Ensure name is not empty or just whitespace
        if not data.get('name', '').strip():
            raise serializers.ValidationError({'name': 'Name is required and cannot be empty'})
        return data
