from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('create', index),
    path('view', index),
    path('job/<str:jobCode>', index)
]