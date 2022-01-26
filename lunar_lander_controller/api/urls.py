from django.urls import path
from .views import JobView, CreateJobView

urlpatterns = [
    path('job', JobView.as_view()),
    path('create-job', CreateJobView.as_view())
]