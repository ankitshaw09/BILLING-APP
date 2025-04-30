from rest_framework import serializers
from .models import Customer, BillingAddress, ShippingAddress


class CustomerSerializer(serializers.ModelSerializer):
    customer_id = serializers.IntegerField(read_only=True, source="company_customer_id")

    class Meta:
        model = Customer
        fields = [
            "id",
            "customer_id",
            "company",
            "name",
            "company_name",
            "phone_number",
            "email",
            "gst_number",
            "created_by",
            "created_at",
        ]
        extra_kwargs = {
            "company_name": {"required": False, "allow_blank": True},
            "phone_number": {"required": False, "allow_blank": True},
            "email": {"required": False, "allow_blank": True},
            "gst_number": {"required": False, "allow_blank": True},
            "created_by": {"read_only": True},
            "created_at": {"read_only": True},
        }

    def validate(self, data):
        # Ensure name is not empty or just whitespace
        if not data.get("name", "").strip():
            raise serializers.ValidationError(
                {"name": "Name is required and cannot be empty"}
            )
        return data


class BaseAddressSerializer(serializers.ModelSerializer):
    class Meta:
        fields = [
            "id",
            "customer_id",
            "name",
            "address_line_1",
            "address_line_2",
            "pincode",
            "city",
            "state",
            "country",
        ]
        extra_kwargs = {
            "address_line_2": {"required": False, "allow_blank": True},
            "pincode": {"required": False, "allow_blank": True},
            "city": {"required": False, "allow_blank": True},
            # "state": {"required": False, "allow_blank": True},
            "country": {"required": False, "allow_blank": True},
        }


class BillingAddressSerializer(BaseAddressSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all(), required=False)

    class Meta(BaseAddressSerializer.Meta):
        model = BillingAddress
        fields = BaseAddressSerializer.Meta.fields + ["customer"]

    def validate(self, data):
        # Don't require customer in the body; it will be handled in perform_create
        if 'customer' not in data:
            raise serializers.ValidationError({"customer": "This field is required."})

        # Check if customer already has a billing address
        if self.instance is None:  # Only check on creation
            if BillingAddress.objects.filter(customer=data["customer"]).exists():
                raise serializers.ValidationError(
                    {"customer": "Customer already has a billing address"}
                )
        return data


class ShippingAddressSerializer(BaseAddressSerializer):
    class Meta(BaseAddressSerializer.Meta):
        model = ShippingAddress
        fields = BaseAddressSerializer.Meta.fields + ["customer", "is_default"]

    def validate(self, data):
        # If setting as default, ensure no other default exists for this customer
        if data.get("is_default", False):
            existing_default = (
                ShippingAddress.objects.filter(
                    customer=data["customer"], is_default=True
                )
                .exclude(id=getattr(self.instance, "id", None))
                .exists()
            )
            if existing_default:
                raise serializers.ValidationError(
                    {"is_default": "Customer already has a default shipping address"}
                )
        return data
