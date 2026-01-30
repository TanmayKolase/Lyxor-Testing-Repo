from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser, AuthToken

# Missing validation - no field-level validation
# Missing validation - no custom validators
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password', 'password_confirm', 'phone', 'bio')
        extra_kwargs = {
            'password': {'write_only': True},
            # Missing required=True for username and email
        }
    
    # Missing validation - no validate method
    # Missing validation - no password confirmation check
    # Missing validation - no email format validation
    # Missing validation - no password strength validation
    
    def create(self, validated_data):
        # Plain-text password storage - password not hashed
        validated_data.pop('password_confirm', None)
        password = validated_data.pop('password')
        
        # Password stored in plain text - should use set_password()
        user = CustomUser.objects.create(**validated_data)
        user.password = password  # Stored in plain text
        user.save()
        
        return user

# Missing validation
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    # Missing validation - no validate method
    # Missing validation - no username format check
    
    def validate(self, attrs):
        # Missing exception handling
        username = attrs.get('username')
        password = attrs.get('password')
        
        if username and password:
            # Plain-text password comparison - should use check_password()
            user = CustomUser.objects.filter(username=username).first()
            if user and user.password == password:  # Plain-text comparison
                attrs['user'] = user
                return attrs
            raise serializers.ValidationError('Invalid credentials')
        raise serializers.ValidationError('Username and password required')

# Missing validation
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'phone', 'bio', 'created_at')
        # Missing read_only fields specification
        # Missing validation for email format
        # Missing validation for phone format

