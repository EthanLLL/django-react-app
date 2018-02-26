# -*- coding: utf-8 -*-

from rest_framework import serializers
from rest_framework.serializers import (
    HyperlinkedIdentityField,
    SerializerMethodField
)
from .models import Post
from accounts.serializers import UserDetailSerializer
from django.contrib.auth import get_user_model

class PostListSerializer(serializers.ModelSerializer):
    detail_url = HyperlinkedIdentityField(
        view_name='post:postdetail',
    )

    delete_url = HyperlinkedIdentityField(
        view_name='post:delete',
    )

    user = UserDetailSerializer(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def get_user(self, obj):
        return str(obj.user.username)


class PostDetailSerializer(serializers.ModelSerializer):

    user = UserDetailSerializer(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def get_user(self, obj):
        return str(obj.user.username)


class PostCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = [
            'content'
        ]