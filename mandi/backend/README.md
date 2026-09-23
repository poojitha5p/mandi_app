# MANDI — Django Backend

Shared backend for the MANDI customer mobile app and admin portal.

## Stack
- Python + Django
- Django REST Framework
- PostgreSQL
- JWT authentication
- Swagger/OpenAPI
- CORS support

## 1. Create environment

Windows PowerShell:

```powershell
py -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
```

If PowerShell blocks activation:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```

## 2. PostgreSQL

Create a database named `mandi`, then update `.env`.

Example:

```sql
CREATE DATABASE mandi;
```

## 3. Migrations

```powershell
python manage.py makemigrations
python manage.py migrate
```

## 4. Create admin user

```powershell
python manage.py createsuperuser
```

## 5. Seed sample data

```powershell
python manage.py seed_data
```

This creates sample categories, products, variants, weight options, preparation options and stock.

## 6. Run server

```powershell
python manage.py runserver
```

Backend:
http://127.0.0.1:8000/

Swagger:
http://127.0.0.1:8000/api/docs/

Django admin:
http://127.0.0.1:8000/admin/

## Main API flow

### Auth
POST `/api/auth/register/`
POST `/api/auth/login/`
POST `/api/auth/token/refresh/`

### Catalog
GET `/api/categories/`
GET `/api/products/`
GET `/api/products/{id}/`

### Cart
GET `/api/cart/`
POST `/api/cart/items/`
PATCH `/api/cart/items/{id}/`
DELETE `/api/cart/items/{id}/`

### Orders
GET `/api/orders/`
POST `/api/orders/`
GET `/api/orders/{id}/`

### Admin
GET `/api/admin/dashboard/`
GET/POST/PATCH `/api/admin/products/`
GET/POST/PATCH `/api/admin/categories/`
GET `/api/admin/orders/`
PATCH `/api/admin/orders/{id}/status/`
GET/PATCH `/api/admin/inventory/`

## JWT

Login:

```json
{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```

Use the returned access token:

```text
Authorization: Bearer <access_token>
```

Admin APIs require a staff/admin user.

## Notes

The API is intentionally shared between Navya's customer app and Naveen's admin portal. The Django backend replaces the originally proposed NestJS backend while preserving the same architecture and API responsibilities.
