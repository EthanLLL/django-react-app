# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth import get_user_model
from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST
)
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly
)
from rest_framework.response import Response
from rest_framework.generics import (
    RetrieveAPIView,
    ListAPIView,
    DestroyAPIView,
    UpdateAPIView,
    CreateAPIView
)

from .serializers import (
    UserCreateSerializer,
    UserLoginSerializer    
)

# Create your views here.

User = get_user_model()


class UserInfoAPIView(APIView):

    def get(self, request):
        user = request.user
        return Response({
            'success': 1,
            'data': {
                'username': user.username,
                'email': user.email
            }
        })


class UserCreateAPIView(CreateAPIView):
    permission_classes = [
        AllowAny
    ]
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()


class UserLoginAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserLoginSerializer
    
    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            new_data = serializer.data
            return Response(new_data, status=HTTP_200_OK)
        return Response(serializer.error, status=HTTP_400_BAD_REQUEST)


