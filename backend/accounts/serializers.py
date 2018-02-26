from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField,
    ValidationError,
    EmailField,
    CharField
)

User = get_user_model()

class UserDetailSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email'
        ]


class UserCreateSerializer(ModelSerializer):
    email = EmailField(label='Email')
    
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password'
        ]
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def validate(self, value):
        data = self.get_initial()
        email = data.get('email')
        user_qs = User.objects.filter(email=email)
        if user_qs.exists():
            raise ValidationError('This email has already registered')
        return value

    def create(self, validated_data):
        print (validated_data)
        username = validated_data['username']
        password = validated_data['password']
        email = validated_data['email']
        user_obj = User(
            username = username,
            email = email
        )
        user_obj.set_password(password)
        user_obj.save()
        return validated_data


class UserLoginSerializer(ModelSerializer):
    username = CharField(required=False, allow_blank=True)
    email = EmailField(label='Email', required=False, allow_blank=True)
    token = CharField(allow_blank=True, read_only=True)
    
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'token'
        ]
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def validate(self, data):
        user_obj = None
        email = data.get('email', None)
        username = data.get('username', None)
        password = data['password']
        if not email and not username:
            raise ValidationError('A username or an email is required to login')
        user = User.objects.filter(
            Q(email=email) | 
            Q(username=username)
        ).distinct()
        user = user.exclude(email__isnull=True).exclude(email__iexact='')
        if user.exists() and user.count() == 1:
            user_obj = user.first()
        else:
            raise ValidationError('This username/email is not valid')
        
        if user_obj:
            if not user_obj.check_password(password):
                raise ValidationError('Incorrect credentials!')

        data['token'] = 'SOME TOKEN'
        return data