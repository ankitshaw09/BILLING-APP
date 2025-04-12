# company/serializers.py

from rest_framework import serializers
from .models import Company
from accounts.models import CustomUser

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        if user.total_companies >= 3:
            raise serializers.ValidationError("You can only create up to 3 companies.")
        company = Company.objects.create(**validated_data)
        user.companies.add(company)
        return company

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
