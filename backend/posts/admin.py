# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import Post
# Register your models here.


class PostsModelAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "content", "updated"]
    list_display_links = ["user"]
    list_filter = ["updated", "timestamp"]
    search_fields = ["user", "content"]

    class Meta:
        model = Post


admin.site.register(Post, PostsModelAdmin)