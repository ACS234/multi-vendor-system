from rest_framework import serializers
from .models import User 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True} 
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Passwords do not match."})

        if User.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError({"username": "Username already exists. Try another."})

        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "Email already registered. Try another."})

        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password') 

        user = User.objects.create_user(  
            role=validated_data['role'],
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role 
        token['username'] = user.username
        return token