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

<!-- Delete Request   -->

POST :http://127.0.0.1:8000/api/accounts/request-delete/
Breaer Token { AccessToken}


<!--      COMPANY                  -->
<!-- Create new company  -->

POST:http://127.0.0.1:8000/api/company/create-company/
Breaer Token { AccessToken}
Json :
{
"trade_name": "Acme Ltd",
"proprietor_name": "Ankit Kumar",
"company_phone_no": "9876543210",
"alternate_phone_no": "9123456789",
"company_email": "acme@example.com",
"alternate_email": "alt@example.com",
"gst_number": "27ABCDE1234F1Z5",
"pan_number": "ABCDE1234F",
"website": "https://acme.com"
}

<!-- Get or UPDATE  company details    -->

GET / PATCH : http://127.0.0.1:8000/api/company/1/profile/
Breaer Token { AccessToken}
Json :
{
"trade_name": "Acme Ltd",
"proprietor_name": "Ankit Kumar",
"company_phone_no": "9876543210",
"alternate_phone_no": "9123456789",
"company_email": "acme@example.com",
"alternate_email": "alt@example.com",
"gst_number": "27ABCDE1234F1Z5",
"pan_number": "ABCDE1234F",
"website": "https://acme.com"
}

here company/1/profile/ = "1" is company_id


<!-- get company list  -->

GET : http://127.0.0.1:8000/api/company/companies-list/
Breaer Token { AccessToken}

<!-- Delete company   -->

Delete  : http://127.0.0.1:8000/api/company/1/delete/
Breaer Token { AccessToken}

here company/1/delete/ = "1" is company_id




 

<!-- Create /GET company Address     -->

GET / POST :http://127.0.0.1:8000/api/company/1/addresses/company/
Breaer Token { AccessToken}
Json :
{
"name": "Head Office",
"address_line_1": "123 Corporate Park",
"address_line_2": "Building B, Floor 4",
"pincode": "560001",
"city": "Bengaluru",
"state": "Karnataka",
"country": "India"
}

here company/1/addresses/company/ = "1" is company_id

<!-- Update Company Address  -->

PATCH :http://127.0.0.1:8000/api/company/1/addresses/company/1/
Breaer Token { AccessToken}
Json :
{
"name": "Head Office",
"address_line_1": "123 Corporate Park",
"address_line_2": "Building B, Floor 4",
"pincode": "560001",
"city": "Bengaluru",
"state": "Karnataka",
"country": "India"
}

here company/1/addresses/company/ = "1" is company_id
here addresses/company/1/ = "1" is Company_address_id

<!-- Create /GET Billing  Address     -->

GET / POST :http://127.0.0.1:8000/api/company/1/addresses/billing/
Breaer Token { AccessToken}
Json :
{
"name": "Accounts ",
"address_line_1": "42 Tax Plaza",
"address_line_2": "2nd Cross, MG Road",
"pincode": "400001",
"city": "Mumbai",
"state": "Maharashtra",
"country": "India"
}

here company/1/addresses/billing/ = "1" is company_id

<!-- Update Billing Address  -->

PATCH :http://127.0.0.1:8000/api/company/1/addresses/billing/2/
Breaer Token { AccessToken}
Json : 
{
"name": "Head Office",
"address_line_1": "123 Corporate Park",
"address_line_2": "Building B, Floor 4",
"pincode": "560001",
"city": "Bengaluru",
"state": "Karnataka",
"country": "India"
}

here company/1/addresses/billing/ = "1" is company_id
here addresses/billing/2/ = "2" is Billing_address_id

<!-- Delete  Billing Address  -->

DELETE :http://127.0.0.1:8000/api/company/1/addresses/billing/2/
Breaer Token { AccessToken}

here company/1/addresses/billing/ = "1" is company_id
here addresses/billing/2/ = "2" is Billing_address_id

<!-- Create /GET Shippping  Address     -->

GET / POST :http://127.0.0.1:8000/api/company/1/addresses/shipping/
Breaer Token { AccessToken}
Json :
{
"name": "Accounts ",
"address_line_1": "42 Tax Plaza",
"address_line_2": "2nd Cross, MG Road",
"pincode": "400001",
"city": "Mumbai",
"state": "Maharashtra",
"country": "India"
}

here company/1/addresses/shipping/ = "1" is company_id

<!-- Update Shipping Address  -->

PATCH :http://127.0.0.1:8000/api/company/1/addresses/shipping/2/
Breaer Token { AccessToken}
Json :
{
"name": "Head Office",
"address_line_1": "123 Corporate Park",
"address_line_2": "Building B, Floor 4",
"pincode": "560001",
"city": "Bengaluru",
"state": "Karnataka",
"country": "India"
}

here company/1/addresses/shipping/ = "1" is company_id
here addresses/shipping/2/ = "2" is Shipping_address_id

<!-- Delete Shipping Address  -->

Delete :http://127.0.0.1:8000/api/company/1/addresses/shipping/2/
Breaer Token { AccessToken}

here company/1/addresses/shipping/ = "1" is company_id
here addresses/shipping/2/ = "2" is Shipping_address_id





<!-- Get/ create stamps -->

GET / POST: http://127.0.0.1:8000/api/company/<company_id>/stamp/
Breaer Token { AccessToken}
json :
{

        "company": 1
        "name": "Official Stamp",
        "stamp_image": "http://127.0.0.1:8000/media/company_stamps/hanuman_jee.jpg",
    }


<!-- PATCH / DELETE stamps -->

PATCH / DELETE:http://127.0.0.1:8000/api/company/<company_id>/stamp/<stamp_id>/
Breaer Token { AccessToken}
json :
{

        "company": 1
        "name": "Official Stamp",
        "stamp_image": "http://127.0.0.1:8000/media/company_stamps/hanuman_jee.jpg",
    }

<!-- Get/ create Signature -->

GET / POST: http://127.0.0.1:8000/api/company/<company_id>/signature/
Breaer Token { AccessToken}
json :
{

       
        "name": "Official sign",
        "stamp_image": "http://127.0.0.1:8000/media/company_stamps/hanuman_jee.jpg",
    }


<!-- PATCH / DELETE signatures -->

PATCH / DELETE: http://127.0.0.1:8000/api/company/<company_id>/signature/<signature_id>/
Breaer Token { AccessToken}




POST or PATCH /api/companies/<company_id>/addresses/company/
{
"name": "Head Office",
"address_line1": "123 Corporate Park",
"address_line2": "Building B, Floor 4",
"pincode": "560001",
"city": "Bengaluru",
"state": "Karnataka",
"country": "India"
}
POST or PATCH /api/companies/<company_id>/addresses/billing/
{
"name": "Accounts Payable",
"address_line1": "42 Tax Plaza",
"address_line2": "2nd Cross, MG Road",
"pincode": "400001",
"city": "Mumbai",
"state": "Maharashtra",
"country": "India"
}

POST or PATCH /api/companies/<company_id>/addresses/shipping/

{
"name": "Warehouse 1",
"address_line1": "NH 48, Logistics Hub",
"address_line2": "Near Toll Naka",
"pincode": "122001",
"city": "Gurgaon",
"state": "Haryana",
"country": "India"
}

[
{
"trade_name": "Delta Industries",
"proprietor_name": "Rohit Mehta",
"company_phone_number": "9876543210",
"alternate_phone_number": "9123456780",
"company_email": "info@deltaindustries.com",
"alternate_email": "support@deltaindustries.com",
"gst_number": "27AAACD1234A1Z5",
"website": "https://www.deltaindustries.com",
"pan_number": "AAACD1234A"
},
{
"trade_name": "SkyNet Pvt Ltd",
"proprietor_name": "Arjun Rao",
"company_phone_number": "9345612398",
"alternate_phone_number": "9112345678",
"company_email": "contact@skynet.in",
"alternate_email": "admin@skynet.in",
"gst_number": "29AABCS1234K1Z9",
"website": "https://www.skynet.in",
"pan_number": "AABCS1234K"
},
{
"trade_name": "FreshFarm Organics",
"proprietor_name": "Meera Desai",
"company_phone_number": "9321457680",
"alternate_phone_number": "",
"company_email": "sales@freshfarm.com",
"alternate_email": "",
"gst_number": "07AAAAA1234A1Z2",
"website": "https://www.freshfarmorganics.com",
"pan_number": "AAAAA1234A"
},
{
"trade_name": "Hexa Technologies",
"proprietor_name": "Sameer Kulkarni",
"company_phone_number": "9001234567",
"alternate_phone_number": "9090909090",
"company_email": "hello@hexatech.io",
"alternate_email": "info@hexatech.io",
"gst_number": "33BBBCC5678B1Z1",
"website": "https://www.hexatech.io",
"pan_number": "BBBCC5678B"
},
{
"trade_name": "Natura Clothing",
"proprietor_name": "Anjali Sharma",
"company_phone_number": "9988776655",
"alternate_phone_number": "8877665544",
"company_email": "fashion@natura.com",
"alternate_email": "help@natura.com",
"gst_number": "24CCCCE7890C1Z7",
"website": "https://www.naturaclothing.com",
"pan_number": "CCCCE7890C"
},
{
"trade_name": "BrightWorks",
"proprietor_name": "Devansh Singh",
"company_phone_number": "9354678123",
"alternate_phone_number": "",
"company_email": "info@brightworks.co",
"alternate_email": "",
"gst_number": "06DDDDF1234D1Z8",
"website": "https://www.brightworks.co",
"pan_number": "DDDDF1234D"
}
]
