from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^(?P<post_id>\d+)', CommentListAPIView.as_view(), name='comment_list'),
    url(r'^like/(?P<id>\d+)', CommentLikeAPIView.as_view(), name='comment_like')
]