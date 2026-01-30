# User Authentication API

Django REST Framework backend for user authentication.

## Features

- User registration and login APIs
- Token-based authentication
- PostgreSQL database integration
- User profile management

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up PostgreSQL database:
```bash
createdb authdb
```

3. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

4. Create superuser:
```bash
python manage.py createsuperuser
```

5. Run the server:
```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

## API Endpoints

### POST /api/auth/signup
Register a new user.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "555-1234",
  "bio": "Software developer"
}
```

### POST /api/auth/login
Login with username and password.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

### GET /api/auth/profile
Get current user profile.

**Headers:**
```
Authorization: Token <token>
```

### PUT /api/auth/profile/update
Update user profile.

### GET /api/auth/users
List all users.

## Project Structure

```
authproject/
├── settings.py          # Django settings
├── urls.py              # URL configuration
└── wsgi.py              # WSGI config

authentication/
├── models.py            # User models
├── serializers.py       # DRF serializers
├── views.py             # API views
├── urls.py              # App URLs
└── utils.py             # Utility functions
```
