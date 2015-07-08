#!/usr/bin/python


from subprocess import Popen
import time
import os



os.environ["DISPLAY"] = ":0.0"

with open("/mnt/config/character/clock_glimpse") as fc:
    glimpse = int(fc.readline())
with open("/mnt/config/character/clock_interval") as fc:
    interval =int(fc.readline())  

while True:
    
   clock = Popen(['/usr/bin/uzbl-core', '-c', '/home/vyoma/.config/uzbl/config', '-g', '1024x768', 'http://localhost/screen1/Vyoma_Clock.html'])
   time.sleep(float(glimpse))
   clock.kill()
   time.sleep(float(interval))

 
