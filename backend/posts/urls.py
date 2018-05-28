from django.conf.urls import url
from .views import (
    PostListAPIView,
    PostDetailAPIView,
    PostUpdateAPIView,
    PostDestroyAPIView,
    PostCreateAPIView,
    PostLikeView
)

urlpatterns = [
    url(r'^$', PostListAPIView.as_view(), name='postlist'),
    url(r'^create/$', PostCreateAPIView.as_view(), name='postlist'),
    url(r'^(?P<pk>\d+)/$', PostDetailAPIView.as_view(), name='postdetail'),
    url(r'^(?P<pk>\d+)/edit/$', PostUpdateAPIView.as_view(), name='update'),
    url(r'^(?P<pk>\d+)/delete/$', PostDestroyAPIView.as_view(), name='delete'),
    url(r'^like/(?P<pk>\d+)/$', PostLikeView.as_view(), name='like'),
]