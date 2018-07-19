from rest_framework.pagination import (
    LimitOffsetPagination,
    PageNumberPagination
)


class PostLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 3
    max_limit = 3


class PostPageNumberPagination(PageNumberPagination):
    page_size = 2