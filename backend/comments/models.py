# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.conf import settings
from posts.models import Post
# Create your models here.

class Comment(models.Model):
    comment = models.TextField()
    comment_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='posted_comment')
    comment_to = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, related_name='receive_comment')
    timestamp = models.DateTimeField(auto_now_add=True)
    post = models.ForeignKey(Post, related_name='comments')
