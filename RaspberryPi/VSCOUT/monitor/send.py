import socket
import os
import subprocess
import time
from datetime import datetime

# This is an example of a UDP client - it creates
# a socket and sends data through it

# create the UDP socket
UDPSock = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)

data = ""

def getinfo():
	global data
	data = "Information from KACANTOUTSB vscout\n"
	data += str(datetime.now()) + "\n"
	#for disk in subprocess.check_output(['df','-h']).split('\n'):
	#    data += disk
	data += str(os.getloadavg()) + "\n"

# Simply set up a target address and port ...
addr = ("162.243.16.178",33333)


while True:
	getinfo()
	UDPSock.sendto(data,addr)
	#time.sleep(5*60)
	time.sleep(10)

