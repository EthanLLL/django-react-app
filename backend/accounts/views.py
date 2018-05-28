# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth import get_user_model
from django.shortcuts import render
from comments.models import *
from posts.models import *
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
        user_count = User.objects.all().count() - 1
        pl_qs = PostLike.objects.filter(
            user_id=user.id,
            post__user__username=u'luozhen'
        )
        cl_qs = CommentLike.objects.filter(
            user_id=user.id,
            comment__comment_by__username=u'luozhen'
        )
        likes_count = pl_qs.count() + cl_qs.count()
        return Response({
            'success': 1,
            'data': {
                'username': user.username,
                'email': user.email,
                'user_count': user_count,
                'likes_count': likes_count
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


