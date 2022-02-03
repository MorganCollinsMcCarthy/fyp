from subprocess import Popen
crash_reward = -200
land_reward = 300
first_leg_reward = 20
right_leg_reward = 20
main_engine_reward = 0.6
side_engine_reward = 0.06


p = Popen(['python', 'rl.py', str(crash_reward), str(land_reward),
           str(first_leg_reward), str(right_leg_reward), str(main_engine_reward), str(side_engine_reward)])
