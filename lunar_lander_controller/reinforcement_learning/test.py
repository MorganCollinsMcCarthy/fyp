from subprocess import Popen
crash_reward = -100
land_reward = 100
first_leg_reward = 10
second_leg_reward = 10
main_engine_reward = 0.3
side_engine_reward = 0.03


p = Popen(['python', 'rl.py', str(crash_reward), str(land_reward),
           str(first_leg_reward), str(second_leg_reward), str(main_engine_reward), str(side_engine_reward),"DQN","AAA"])
