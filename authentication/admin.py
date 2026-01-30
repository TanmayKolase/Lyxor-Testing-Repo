from django.contrib import admin
from .models import CustomUser, AuthToken

# Register models for admin interface
admin.site.register(CustomUser)
admin.site.register(AuthToken)

