from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken


class RegisterAPIView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        
        if serializer.is_valid():
            # Save user data
            user = serializer.save()

            # Generate the refresh and access tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            # Add the role to the JWT payload (claims)
            access_token_payload = refresh.access_token.payload
            access_token_payload['role'] = user.role

            data = {
                'response': "Successfully Registered",
                'username': user.username,
                'email': user.email,
                'token': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                'role': user.role, 
            }
            return Response(data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    def get(self, request):
        user = request.user  
        serializer = UserSerializer(user)  
        return Response(serializer.data, status=status.HTTP_200_OK)