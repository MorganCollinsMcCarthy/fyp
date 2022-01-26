from rest_framework import serializers
from .models import Job


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'complete', 'crash_reward',
                  'land_reward','left_leg_reward','right_leg_reward',
                  'main_engine_reward','side_engine_reward', 'created_at')