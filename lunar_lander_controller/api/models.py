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
    dqn: models.BooleanField(null=False, default=True)
    a2c: models.BooleanField(null=False, default=False)
    ddpg: models.BooleanField(null=False, default=False)
    her: models.BooleanField(null=False, default=False)
    ppo: models.BooleanField(null=False, default=False)
    sac: models.BooleanField(null=False, default=False)
    created_at = models.DateTimeField(auto_now_add=True)
