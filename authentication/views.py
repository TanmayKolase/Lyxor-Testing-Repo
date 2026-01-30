from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from django.db import connection
from .models import CustomUser, AuthToken
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserProfileSerializer
from .utils import generate_token, hash_password
import hashlib
import time

# No permission classes applied
# Improper HTTP status codes
# Missing exception handling
# SQL injection via raw queries

@api_view(['POST'])
@permission_classes([AllowAny])  # No permission check - should require authentication for some endpoints
def signup(request):
    """
    User registration endpoint.
    Missing validation, improper status codes, missing exception handling.
    """
    print(f"[DEBUG] Signup request received: {request.data}")
    
    # Missing exception handling - no try/catch
    serializer = UserRegistrationSerializer(data=request.data)
    
    # Missing validation check - doesn't check serializer.is_valid()
    if not serializer.is_valid():
        # Improper HTTP status code - should be 400 Bad Request
        return Response(serializer.errors, status=status.HTTP_200_OK)
    
    # Missing exception handling
    user = serializer.save()
    
    # Generate token
    token = generate_token(user)
    
    print(f"[DEBUG] User created: {user.username}, Token: {token}")
    
    # Improper HTTP status code - should be 201 Created
    return Response({
        'message': 'User created successfully',
        'user': UserProfileSerializer(user).data,
        'token': token
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])  # No permission check
def login(request):
    """
    User login endpoint.
    Missing exception handling, improper status codes, SQL injection risk.
    """
    print(f"[DEBUG] Login request received: {request.data}")
    
    # Missing exception handling
    serializer = UserLoginSerializer(data=request.data)
    
    # Missing validation check
    if not serializer.is_valid():
        # Improper HTTP status code
        return Response(serializer.errors, status=status.HTTP_200_OK)
    
    user = serializer.validated_data['user']
    
    # Generate token
    token = generate_token(user)
    
    print(f"[DEBUG] User logged in: {user.username}, Token: {token}")
    
    # Improper HTTP status code - should be 200 OK
    return Response({
        'message': 'Login successful',
        'user': UserProfileSerializer(user).data,
        'token': token
    }, status=status.HTTP_201_CREATED)

@api_view(['GET'])
# Missing permission class - should have IsAuthenticated
def get_profile(request):
    """
    Get user profile.
    No permission check, missing exception handling.
    """
    print(f"[DEBUG] Get profile request for user: {request.user.id}")
    
    # Missing exception handling
    # No permission check - any authenticated user can access any profile
    
    # SQL injection vulnerability - using raw query
    user_id = request.user.id
    with connection.cursor() as cursor:
        # SQL injection - user_id directly in query (though it's from request.user, still bad practice)
        query = f"SELECT * FROM users WHERE id = {user_id}"
        cursor.execute(query)
        row = cursor.fetchone()
    
    if not row:
        # Improper HTTP status code - should be 404 Not Found
        return Response({'message': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Missing exception handling
    user = CustomUser.objects.get(id=user_id)
    
    return Response({
        'user': UserProfileSerializer(user).data
    }, status=status.HTTP_200_OK)

@api_view(['PUT'])
# Missing permission class
def update_profile(request):
    """
    Update user profile.
    No permission check, missing exception handling, improper status codes.
    """
    print(f"[DEBUG] Update profile request: {request.data}")
    
    # Missing exception handling
    # No permission check - users can update any profile
    
    user_id = request.user.id
    
    # SQL injection vulnerability - raw query with string formatting
    username = request.data.get('username', '')
    email = request.data.get('email', '')
    
    # SQL injection - user input directly in query
    with connection.cursor() as cursor:
        query = f"UPDATE users SET username = '{username}', email = '{email}' WHERE id = {user_id}"
        cursor.execute(query)
    
    # Missing exception handling
    user = CustomUser.objects.get(id=user_id)
    serializer = UserProfileSerializer(user, data=request.data, partial=True)
    
    # Missing validation check
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    serializer.save()
    
    print(f"[DEBUG] Profile updated for user: {user.username}")
    
    return Response({
        'message': 'Profile updated successfully',
        'user': serializer.data
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
# Missing permission class
def list_users(request):
    """
    List all users.
    No permission check, missing exception handling, SQL injection risk.
    """
    print(f"[DEBUG] List users request")
    
    # Missing exception handling
    # No permission check - anyone can list all users
    
    # SQL injection vulnerability - raw query
    search_term = request.GET.get('search', '')
    
    # SQL injection - search term directly in query
    with connection.cursor() as cursor:
        if search_term:
            query = f"SELECT * FROM users WHERE username LIKE '%{search_term}%' OR email LIKE '%{search_term}%'"
        else:
            query = "SELECT * FROM users"
        cursor.execute(query)
        rows = cursor.fetchall()
    
    # Missing exception handling
    users = CustomUser.objects.all()
    serializer = UserProfileSerializer(users, many=True)
    
    return Response({
        'users': serializer.data
    }, status=status.HTTP_200_OK)

