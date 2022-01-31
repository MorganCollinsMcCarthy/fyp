from django.urls import path
from .views import JobView, CreateJobView, GetJob

urlpatterns = [
    path('job', JobView.as_view()),
    path('create-job', CreateJobView.as_view()),
    path('get-job', GetJob.as_view())
]