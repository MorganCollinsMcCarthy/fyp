from rest_framework import serializers
from .models import Job


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('id', 'code', 'complete', 'crash_reward',
                  'land_reward','first_leg_reward','second_leg_reward',
                  'main_engine_reward','side_engine_reward', 'created_at','dqn','a2c','ars','trpo','ppo','qrdqn')

class CreateJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('crash_reward','land_reward',
                  'first_leg_reward','second_leg_reward',
                  'main_engine_reward','side_engine_reward','dqn','a2c','ars','trpo','ppo','qrdqn')