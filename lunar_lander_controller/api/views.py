from django.shortcuts import render
from rest_framework import generics, status
from .serializers import JobSerializer, CreateJobSerializer
from .models import Job
from rest_framework.views import APIView
from rest_framework.response import Response
import threading
import subprocess
import string
import random


def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Job.objects.filter(code=code).count() == 0:
            break

    return code


def popen_and_call(on_exit, popen_args):
    def run_in_thread(on_exit, popen_args):
        proc = subprocess.Popen(popen_args)
        proc.wait()
        on_exit()
        return
    thread = threading.Thread(target=run_in_thread, args=(on_exit, popen_args))
    thread.start()
    return thread

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
            code = generate_unique_code()
            crash_reward = serializer.data.get('crash_reward')
            land_reward = serializer.data.get('land_reward')
            first_leg_reward = serializer.data.get('first_leg_reward')
            second_leg_reward = serializer.data.get('second_leg_reward')
            main_engine_reward = serializer.data.get('main_engine_reward')
            side_engine_reward = serializer.data.get('side_engine_reward')
            dqn = serializer.data.get('dqn')
            a2c = serializer.data.get('a2c')
            ars = serializer.data.get('ars')
            trpo = serializer.data.get('trpo')
            ppo = serializer.data.get('ppo')
            qrdqn = serializer.data.get('qrdqn')
            job = Job(code=code, crash_reward=crash_reward, land_reward=land_reward, first_leg_reward=first_leg_reward,
                      second_leg_reward=second_leg_reward, main_engine_reward=main_engine_reward, side_engine_reward=side_engine_reward, 
                      dqn=dqn, a2c=a2c, ars=ars, trpo=trpo, ppo=ppo, qrdqn=qrdqn)
            job.save()

            def jobComplete():
                job.complete = True
                job.save()
            
            if(dqn):
                popen_and_call(jobComplete, ['python', 'reinforcement_learning/algorithms/dqn.py', str(crash_reward), str(land_reward),
                       str(first_leg_reward), str(second_leg_reward), str(main_engine_reward), str(side_engine_reward), code])
            
            if(a2c):
                popen_and_call(jobComplete, ['python', 'reinforcement_learning/algorithms/a2c.py', str(crash_reward), str(land_reward),
                       str(first_leg_reward), str(second_leg_reward), str(main_engine_reward), str(side_engine_reward), code])
            
            if(ars):
                popen_and_call(jobComplete, ['python', 'reinforcement_learning/algorithms/ars.py', str(crash_reward), str(land_reward),
                       str(first_leg_reward), str(second_leg_reward), str(main_engine_reward), str(side_engine_reward), code])
            
            if(trpo):
                popen_and_call(jobComplete, ['python', 'reinforcement_learning/algorithms/trpo.py', str(crash_reward), str(land_reward),
                       str(first_leg_reward), str(second_leg_reward), str(main_engine_reward), str(side_engine_reward), code])
            
            if(ppo):
                popen_and_call(jobComplete, ['python', 'reinforcement_learning/algorithms/ppo.py', str(crash_reward), str(land_reward),
                       str(first_leg_reward), str(second_leg_reward), str(main_engine_reward), str(side_engine_reward), code])
            
            if(qrdqn):
                popen_and_call(jobComplete, ['python', 'reinforcement_learning/algorithms/qrdqn.py', str(crash_reward), str(land_reward),
                       str(first_leg_reward), str(second_leg_reward), str(main_engine_reward), str(side_engine_reward), code])

            return Response(JobSerializer(job).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
