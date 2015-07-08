#!/bin/python




from subprocess import Popen
import time


while True:
    clock = Popen('uzbl-core -g 1024x768')
    time.sleep(60)
    clock.kill()
    time.sleep(10)


 	 

