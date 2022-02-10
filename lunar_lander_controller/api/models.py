from django.db import models

# Create your models here.

class Job(models.Model):
    code = models.CharField(max_length=8, default="", unique=True)
    complete = models.BooleanField(null=False, default=False)
    crash_reward = models.IntegerField(null=False, default=-100)
    land_reward = models.IntegerField(null=False, default=100)
    first_leg_reward = models.IntegerField(null=False, default=10)
    second_leg_reward = models.IntegerField(null=False, default=10)
    main_engine_reward = models.FloatField(null=False, default=0.3)
    side_engine_reward = models.FloatField(null=False, default=0.03)
    side_engine_reward = models.FloatField(null=False, default=0.03)
    algorithm = models.CharField(null=False, max_length=5, default="DQN")
    created_at = models.DateTimeField(auto_now_add=True)
