# -*- coding: utf-8 -*-

from rest_framework import serializers
from rest_framework.serializers import (
    HyperlinkedIdentityField,
    SerializerMethodField
)
from .models import Comment
from accounts.serializers import UserDetailSerializer
from django.contrib.auth import get_user_model


class CommentListSerializer(serializers.ModelSerializer):

    comment_by = UserDetailSerializer(read_only=True)
    comment_to = UserDetailSerializer(read_only=True)
    likes = SerializerMethodField()
    class Meta:
        model = Comment
        fields = '__all__'

    def get_user(self, obj):
        return str(obj.user.username)

    def get_likes(self, obj):
        return obj.likes.all().count()