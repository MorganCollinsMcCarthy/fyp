from rest_framework import serializers
from .models import Job


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('id', 'code', 'complete', 'crash_reward',
                  'land_reward','first_leg_reward','right_leg_reward',
                  'main_engine_reward','side_engine_reward', 'created_at')

class CreateJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('crash_reward','land_reward',
                  'first_leg_reward','right_leg_reward',
                  'main_engine_reward','side_engine_reward')