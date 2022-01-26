from django.db import models
import string
import random


def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Job.objects.filter(code=code).count() == 0:
            break

    return code

# Create your models here.


class Job(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    complete = models.BooleanField(null=False, default=False)
    crash_reward = models.IntegerField(null=False, default=-100)
    land_reward = models.IntegerField(null=False, default=100)
    left_leg_reward = models.IntegerField(null=False, default=10)
    right_leg_reward = models.IntegerField(null=False, default=10)
    main_engine_reward = models.FloatField(null=False, default=0.3)
    side_engine_reward = models.FloatField(null=False, default=0.03)
    created_at = models.DateTimeField(auto_now_add=True)
