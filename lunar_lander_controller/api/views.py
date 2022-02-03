from django.shortcuts import render
from rest_framework import generics, status
from .serializers import JobSerializer, CreateJobSerializer
from .models import Job
from rest_framework.views import APIView
from rest_framework.response import Response
from subprocess import Popen

# Create your views here.


class JobView(generics.ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer


class GetJob(APIView):
    serializer_class = JobSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            job = Job.objects.filter(code=code)
            if len(job) > 0:
                data = JobSerializer(job[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Job Not Found': 'Invalid Job Code.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Code paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)


class CreateJobView(APIView):
    serializer_class = CreateJobSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            crash_reward = serializer.data.get('crash_reward')
            land_reward = serializer.data.get('land_reward')
            first_leg_reward = serializer.data.get('first_leg_reward')
            second_leg_reward = serializer.data.get('second_leg_reward')
            main_engine_reward = serializer.data.get('main_engine_reward')
            side_engine_reward = serializer.data.get('side_engine_reward')
            job = Job(crash_reward=crash_reward, land_reward=land_reward, first_leg_reward=first_leg_reward,
                      second_leg_reward=second_leg_reward, main_engine_reward=main_engine_reward, side_engine_reward=side_engine_reward)
            job.save()

            p = Popen(['python', 'reinforcement_learning/rl.py', str(crash_reward), str(land_reward),
                       str(first_leg_reward), str(second_leg_reward), str(main_engine_reward), str(side_engine_reward)])

            return Response(JobSerializer(job).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
