# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import Comment
# Register your models here.


class CommentModelAdmin(admin.ModelAdmin):
    list_display = ['comment', 'comment_to_id', 'comment_by_id', 'post_id']
    list_display_links = ["comment"]
    list_filter = ["timestamp"]

    class Meta:
        model = Comment


admin.site.register(Comment, CommentModelAdmin)
