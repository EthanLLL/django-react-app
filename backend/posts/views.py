# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import datetime
from django.db.models import Q
from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect, Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from .models import *
from .serializers import (
    PostListSerializer,
    PostDetailSerializer,
    PostCreateSerializer
)

from rest_framework.filters import (
    SearchFilter,
    OrderingFilter
)
from rest_framework.generics import (
    RetrieveAPIView,
    ListAPIView,
    DestroyAPIView,
    UpdateAPIView,
    CreateAPIView
)
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly
)
from .permissions import IsOwnerOrReadOnly
from .pagination import (
    PostLimitOffsetPagination,
    PostPageNumberPagination
)


class PostListAPIView(ListAPIView):
    serializer_class = PostListSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['content', 'user__first_name']
    pagination_class = PostLimitOffsetPagination

    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        last_post_id = self.request.GET.get('last_post_id', 0)
        print (last_post_id)
        queryset_list = Post.objects.filter().exclude(id=int(last_post_id)).order_by('-timestamp')
        for i in queryset_list:
            print (i.id)
        query = self.request.GET.get('q', None)
        if query:
            queryset_list = queryset_list.filter(
                Q(content__icontains=query) |
                Q(user__first_name__icontains=query) |
                Q(user__last_name__icontains=query)
            ).distinct()
        return queryset_list


class PostDetailAPIView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer


class PostCreateAPIView(APIView):
    
    def post(self, request):
        user_id = request.user.id
        content = request.data.get('content', '')
        today = datetime.datetime.now()
        today = str(today)[:10]
        # post_qs = Post.objects.filter(
        #     user_id=user_id,
        #     timestamp__icontains=today
        # )
        # if post_qs.exists() or post_qs.count() != 0:
        #     return Response({
        #         'success': 0,
        #         'msg': u'Not supposed to post twice during 1 day~'
        #     })
        post = Post.objects.create(
            content=content,
            user_id=user_id
        )
        return Response({
            'success': 1,
            'msg': u'发布成功'
        })


class PostUpdateAPIView(UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer


class PostDestroyAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsOwnerOrReadOnly
    ]

    def delete(self, request, pk):
        Post.objects.filter(id=pk).delete()
        return Response({
            'success': 1,
            'msg': u'deleted~'
        })


class PostLikeView(APIView):

    def post(self, request, pk):
        user_id = request.user.id
        queryset = PostLike.objects.filter(
            user_id=user_id,
            post_id=pk
        )
        if queryset.exists() or queryset.count() != 0:
            return Response({
                'success': 0,
                'msg': u'already liked~'
            })
        PostLike.objects.create(
            user_id=request.user.id,
            post_id=pk
        )
        return Response({
            'success': 1,
            'msg': u'like~~'
        })
