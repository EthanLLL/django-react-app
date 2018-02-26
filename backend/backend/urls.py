"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^posts/', include('posts.urls', namespace='post')),
    url(r'^auth/token', obtain_jwt_token),
    url(r'^users/', include('accounts.urls', namespace='users')),
    # url(r'^comments/', include('comments.urls', namespace='comment')),
]

'''
curl -X POST -d "username=luozhen&password=luozhenzuishuai" http://localhost:8000/auth/token/

eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6Imx1b3poZW4iLCJleHAiOjE1MTkyNzQ2MDksImVtYWlsIjoiIn0.Db7-b7pIGGfCGO1RKtqkKS1kO7MS4senZMgqM6wdZbU

curl -H "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNCwidXNlcm5hbWUiOiJsdW96aGVuMDA0IiwiZXhwIjoxNTE5NjA4MDkzLCJlbWFpbCI6Imx1b3poZW4wOTA5QGdtYWlsLmNvbSJ9.57_IrS-GqK4V54YsRYmMSyioykZTSnJOKpLxMQREzgA" http://localhost:8000/posts/

curl http://localhost:8000/posts/

curl -X POST -H "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6Imx1b3poZW4iLCJleHAiOjE1MTkyNzY5NzEsImVtYWlsIjoiIn0.3K3-9TB_q-7ywHuWDF1vcc-TxXDY1zXdz_QYpPHEch0" -H "Content-type: application/json" -d '{"user": 1, "content": "test-auth-token"}' 'http://localhost:8000/posts/create/'

eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6Imx1b3poZW4iLCJleHAiOjE1MTkyNzY5NzEsImVtYWlsIjoiIn0.3K3-9TB_q-7ywHuWDF1vcc-TxXDY1zXdz_QYpPHEch0
'''
