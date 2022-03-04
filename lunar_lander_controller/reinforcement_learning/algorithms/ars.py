import environment
import sys
import gym
import subprocess
import os

from sb3_contrib import ARS
from stable_baselines3.common.logger import configure
from stable_baselines3.common.callbacks import EvalCallback
from stable_baselines3.common.evaluation import evaluate_policy
from stable_baselines3.common.vec_env import VecVideoRecorder, DummyVecEnv

#Env and custom rewards
env = environment.LunarLander()
env.crash_reward = int(sys.argv[1])
env.land_reward = int(sys.argv[2])
env.first_leg_reward = int(sys.argv[3])
env.second_leg_reward = int(sys.argv[4])
env.main_engine_reward = float(sys.argv[5])
env.side_engine_reward = float(sys.argv[6])

env = gym.wrappers.TimeLimit(env, max_episode_steps=3000)

log_path = "./reinforcement_learning/logs/"+sys.argv[7]+"/ARS"
logger = configure(log_path, ["csv", "json", "tensorboard"])
model = ARS("MlpPolicy", env, verbose=1)
model.set_logger(logger)

eval_callback = EvalCallback(env, best_model_save_path=log_path, eval_freq=100000,
                             deterministic=True, render=False)

model.learn(2950000, callback=eval_callback)

video_length = 1000
vec_env = DummyVecEnv([lambda: env])
vid_env = VecVideoRecorder(vec_env, log_path,
                           record_video_trigger=lambda x: x == 0, video_length=video_length,
                           name_prefix="temp")

obs = vid_env.reset()
for _ in range(video_length + 1):
    action, _states = model.predict(obs)
    obs, _, _, _ = vid_env.step(action)

    # Save the video
vid_env.close()

subprocess.Popen(['ffmpeg', '-i', log_path+'/temp-step-0-to-step-500.mp4',
                  '-c:v', 'libx264', '-c:a', 'aac', log_path+'/output.mp4'])

files = os.listdir(log_path)
for file in files:
    if 'events.out.tfevents' in file:
        print(file)
        os.rename(log_path+'/'+file, log_path+'/tfevents.0')

rewards, length = evaluate_policy(model, 
                                                                model.get_env(), 
                                                                n_eval_episodes=10,
                                                                return_episode_rewards=True)

textfile = open(log_path+"/eval.txt", "w")
for element in rewards:
    textfile.write(str(element) + ",")
textfile.close()