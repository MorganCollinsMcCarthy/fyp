import sys
import gym
import stable_baselines3 as sb3

import environment

env = environment.LunarLander()

env.crash_reward = int(sys.argv[1])
env.land_reward = int(sys.argv[2])
env.first_leg_reward = int(sys.argv[3])
env.second_leg_reward = int(sys.argv[4])
env.main_engine_reward = float(sys.argv[5])
env.side_engine_reward = float(sys.argv[6])

env = gym.wrappers.TimeLimit(env, max_episode_steps=1)

agent = sb3.DQN('MlpPolicy', 
                env, 
                verbose=0)

agent.learn(total_timesteps=1)

mean_reward, std_reward = sb3.common.evaluation.evaluate_policy(agent, 
                                                                agent.get_env(), 
                                                                n_eval_episodes=10)
print("Mean Reward: {} +/- {}".format(mean_reward, std_reward))