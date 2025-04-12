from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from django.conf import settings

class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Standard JWT authentication
        authentication_result = super().authenticate(request)
        if authentication_result is None:
            return None

        user, token = authentication_result

        # ✅ Check if the token matches the latest token stored in DB
        if user.latest_access_token != str(token):
            raise InvalidToken("Invalid or expired token. Please log in again.")

        return user, token
