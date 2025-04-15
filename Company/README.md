npx create-react-app@latest frontend 
npm install axios @tanstack/react-query @reduxjs/toolkit react-redux
npm install axios @tanstack/react-query


<!-- registration api  -->

POST :http://127.0.0.1:8000/api/accounts/register/
{
"name": "John Doe",
"phone_number": "9876543210",
"email": "john@example.com",
"password": "securepassword123"
}

<!-- login API -->

post : http://127.0.0.1:8000/api/accounts/login/
json data :

{
"email": "ankitshaw9163@gmail.com",
"password": "SecurePass123"
}

responses json data:
{
"refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0Njg4MjAyMywiaWF0IjoxNzQ0MjkwMDIzLCJqdGkiOiI3NjBmYTJiZTA5NWU0ODEwYmM3OWU0YTVmZDhhNjRkZiIsInVzZXJfaWQiOjJ9.fxEWLLQ4OjPkzocH-PEX5ASvljv3rsgGyOwdgGv3cMw",
"access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ2ODgyMDIzLCJpYXQiOjE3NDQyOTAwMjMsImp0aSI6ImZkNDU2MDU3NTc1NDQ4YTk4NDQ0YWZiY2QxZWJkOGIzIiwidXNlcl9pZCI6Mn0.GNnXqlQYq56QRSkl_3pI-uYtm7rkyh89k55mGguyB1w",
"user": {
"id": 2,
"name": "John Doe",
"email": "john@example.com",
"phone_number": "9876543210"
}
}

<!-- logout API  -->

post : http://127.0.0.1:8000/api/accounts/logout/
Breaer Token { AccessToken} for verification
json : {
"refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0MzY5ODUxMSwiaWF0IjoxNzQzMDkzNzExLCJqdGkiOiI1ZWU3ZjM1ZGE3MmQ0NTkyYWM1ZTdlZWYzYTg0ZjQ2NCIsInVzZXJfaWQiOjJ9.MAjtWnSxLIDdlFpzHBkuFmV6ZAPJ5N2ldP1wYqmiOgs"
}

response delete access AND refresh token

<!-- logout from all devices  -->
POST :http://127.0.0.1:8000/api/accounts/logout-all/
Breaer Token { AccessToken}



<!-- user profile API  -->
GET , PATCH : http://127.0.0.1:8000/api/accounts/profile/
Bearer token : access token
{
    "id": 2,
    "email": "john@example.com",
    "name": "Johnny",
    "phone_number": "9998887777"
}
from this api you can get user profile details and update profile 




<!-- create new company -->

post : http://127.0.0.1:8000/api/accounts/profile/new-company/
Bearer token : access token

{
"company_logo": null,
"signature": null,
"country": "India",
"trade_name": "Greenfield Solutions",
"proprietor_name": "Rohan Gupta",
"phone": "7777733333",
"alt_phone": "6543210987",
"email": "contact@greenfield.com",
"alt_email": "accounts@greenfield.com",
"gst_no": "31ABCDE7777H3X7",
"address_line1": "No. 22, 1st Floor",
"address_line2": "MG Road",
"pincode": "560001",
"city": "Bangalore",
"state": "Karnataka"
}

<!-- list of companies -->

GET : http://127.0.0.1:8000/api/accounts/profile/companies/
Bearer Token : access_token

<!-- Get company details  -->

Get : http://127.0.0.1:8000/api/accounts/profile/company/1/

bearer token : access_token

<!-- update / patch company details  -->

Patch : http://127.0.0.1:8000/api/accounts/profile/company/1/
Bearer token : access_token

<!-- switch or select  company  -->

post : http://127.0.0.1:8000/api/accounts/profile/company/1/
Bearer token : access_token

<!-- add bank details  -->

POST , PATCH :http://127.0.0.1:8000/api/accounts/profile/bank-account/

for cretaet account
{
"company": 2,
"account_no": "123456789010",
"confirm_account_no": "123456789010",
"ifsc_code": "SBIN0000001",
"upi_id": "mainacc@upi",
"notes": "Main SBI account"
}

for update :
{
"id":35 ,
"company": 2,
"upi_id": "updated@upi",
"notes": "Updated note only"
}

<!-- add Additional fields   -->

Post : http://127.0.0.1:8000/api/accounts/profile/additional-field/

{
"company": 1,
"label": "PAN Number",
"value": "ABCDE1234F",
"notes": "For GST Filing"
}

or use
{
"trade_name": "Bharat Supplies",
"label": "Vehicle Number",
"value": "WB02AP1522",
"notes": "Main transport"
}

also this add this from company
Patch : http://127.0.0.1:8000/api/accounts/profile/company/1/
Bearer token : access_token

"additional_fields": [
{
"label": "PAN Number",
"value": "ABCDE1234F",
"notes": "For GST Filing"
},
{
"label": "Vehicle Number",
"value": "WB02AP1522",
"notes": "Delivery Van"
}
]

<!-- add STAMP    -->

Post : http://127.0.0.1:8000/api/accounts/profile/additional-field/

{
"company": 1,
"label": "PAN Number",
"value": "ABCDE1234F",
"notes": "For GST Filing"
}

or use
{
"trade_name": "Bharat Supplies",
"label": "Vehicle Number",
"value": "WB02AP1522",
"notes": "Main transport"
}

also this add this from company
Patch : http://127.0.0.1:8000/api/accounts/profile/company/1/
Bearer token : access_token

"stamps": [
{
"name": "Authorized Signature",
"image": "data:image/png;base64,...",
"notes": "For invoicing"
},
{
"name": "Paid Stamp",
"image": "data:image/png;base64,...",
"notes": "Used for bills"
}
]

<!-- BILLING ADDRESS  -->
 <!-- add billing address  -->

POST : http://127.0.0.1:8000/api/accounts/profile/billing-address/
