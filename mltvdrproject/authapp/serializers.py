from rest_framework import serializers
from django.contrib.auth.models import User

from django.contrib.auth import get_user_model


class RegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
        
    def save(self):
        password = self.validated_data['password']
        confirm_password = self.validated_data['confirm_password']
        
        if password != confirm_password:
            raise serializers.ValidationError("Passwords don't match.")
        
        if User.objects.filter(username=self.validated_data['username']).exists():
            raise serializers.ValidationError("Username already exists")
        
        if User.objects.filter(email=self.validated_data['email']).exists():
            raise serializers.ValidationError("Email already exists.")
        
        user = User.objects.create_user(
            username=self.validated_data['username'],
            email=self.validated_data['email'],
            password=password,  
        )
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email','first_name', 'last_name']
    