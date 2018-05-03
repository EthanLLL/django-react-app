from django.conf.urls import url
from .views import (
    UserCreateAPIView,
    UserLoginAPIView,
    UserInfoAPIView
)

urlpatterns = [
    url(r'^register/$', UserCreateAPIView.as_view(), name='register'),
    url(r'^login/$', UserLoginAPIView.as_view(), name='login'),
    url(r'^user_info', UserInfoAPIView.as_view(), name='user_info')
]