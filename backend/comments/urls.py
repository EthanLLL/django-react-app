from django.conf.urls import url

from .views import (
    CommentListAPIView
)

urlpatterns = [
    url(r'^(?P<post_id>\d+)', CommentListAPIView.as_view(), name='comment_list'),
]