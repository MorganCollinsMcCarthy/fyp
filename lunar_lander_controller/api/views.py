from django.shortcuts import render
from rest_framework import generics, status
from .serializers import JobSerializer, CreateJobSerializer
from .models import Job
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


class JobView(generics.ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class CreateJobView(APIView):
    serializer_class = CreateJobSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            crash_reward = serializer.data.get('crash_reward')
            land_reward = serializer.data.get('land_reward')
            left_leg_reward = serializer.data.get('left_leg_reward')
            right_leg_reward = serializer.data.get('right_leg_reward')
            main_engine_reward = serializer.data.get('main_engine_reward')
            side_engine_reward = serializer.data.get('side_engine_reward')
            job = Job(crash_reward=crash_reward, land_reward=land_reward, left_leg_reward=left_leg_reward,
                            right_leg_reward=right_leg_reward,main_engine_reward=main_engine_reward,side_engine_reward=side_engine_reward)
            job.save()
            return Response(JobSerializer(job).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)