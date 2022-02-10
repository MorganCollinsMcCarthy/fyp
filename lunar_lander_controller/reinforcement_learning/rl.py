import environment
import sys

from stable_baselines3 import DQN
from stable_baselines3 import A2C
from stable_baselines3.common.logger import configure

#Env and custom rewards 
env = environment.LunarLander()
env.crash_reward = int(sys.argv[1])
env.land_reward = int(sys.argv[2])
env.first_leg_reward = int(sys.argv[3])
env.second_leg_reward = int(sys.argv[4])
env.main_engine_reward = float(sys.argv[5])
env.side_engine_reward = float(sys.argv[6])

log_path = "./reinforcement_learning/logs/"+sys.argv[8]
# set up logger
new_logger = configure(log_path, ["csv"])

model = DQN("MlpPolicy", env, verbose=1)


# Set new logger
model.set_logger(new_logger)
model.learn(10000)
print("Done")