# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework.views import APIView
from .models import Comment
from .serializers import CommentListSerializer
from rest_framework.response import Response
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly
)
# Create your views here.

class CommentListAPIView(APIView):

    permission_classes = [AllowAny]

    def get(self, request, post_id):
        user = request.user.id
        queryset = Comment.objects.filter(
            post_id=post_id,
            # comment_to_id=None
        ).order_by('-timestamp')
        serializer = CommentListSerializer(queryset, many=True)
        return Response({
            'success': 1,
            'data': serializer.data
        })

    def post(self, request, post_id):

        comment_by_id = request.user.id
        comment_to_id = request.data.get('comment_to_id', None)
        comment = request.data.get('comment', '')
        param_dict = {
            'comment': comment,
            'comment_by_id': comment_by_id,
            'post_id': post_id
        }
        if comment_to_id:
            param_dict['comment_to_id'] = comment_to_id
        cursor = Comment.objects.create(**param_dict)

        return Response({
            'success': 1,
            'msg': 'Comment Posted~'
        })
