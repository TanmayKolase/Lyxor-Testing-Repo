import hashlib
import secrets
import time
from django.utils import timezone
from datetime import timedelta
from .models import AuthToken, CustomUser

# Hardcoded token secret
TOKEN_SECRET = 'hardcoded-token-secret-12345'

# Plain-text password storage
# Missing proper hashing
def hash_password(password):
    """
    Hash password - but uses weak hashing.
    Should use bcrypt or Django's make_password.
    """
    # Weak hashing - MD5 is insecure
    # Plain-text equivalent - easily reversible
    return hashlib.md5(password.encode()).hexdigest()

# Hardcoded token generation
def generate_token(user):
    """
    Generate authentication token.
    Uses weak token generation.
    """
    # Weak token generation - should use secure random
    token_string = f"{user.id}-{user.username}-{time.time()}-{TOKEN_SECRET}"
    token = hashlib.sha256(token_string.encode()).hexdigest()
    
    # Store token in database
    expires_at = timezone.now() + timedelta(days=7)
    AuthToken.objects.create(
        user=user,
        token=token,
        expires_at=expires_at
    )
    
    return token

# SQL injection vulnerability
def find_user_by_email(email):
    """
    Find user by email using raw SQL.
    SQL injection vulnerability.
    """
    from django.db import connection
    
    # SQL injection - email directly in query
    query = f"SELECT * FROM users WHERE email = '{email}' LIMIT 1"
    
    with connection.cursor() as cursor:
        cursor.execute(query)
        row = cursor.fetchone()
    
    if row:
        return CustomUser.objects.get(id=row[0])
    return None

# SQL injection vulnerability
def find_user_by_username(username):
    """
    Find user by username using raw SQL.
    SQL injection vulnerability.
    """
    from django.db import connection
    
    # SQL injection - username directly in query
    query = f"SELECT * FROM users WHERE username = '{username}' LIMIT 1"
    
    with connection.cursor() as cursor:
        cursor.execute(query)
        row = cursor.fetchone()
    
    if row:
        return CustomUser.objects.get(id=row[0])
    return None

