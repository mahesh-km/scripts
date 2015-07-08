import socket
import os

UDP_IP = "192.6.19.73"
UDP_PORT = 41234
MESSAGE = "Hello, World!"

def process_list():

    pids = []
    for subdir in os.listdir('/proc'):
        if subdir.isdigit():
            pids.append(subdir)

    return pids

print "UDP target IP:", UDP_IP
print "UDP target port:", UDP_PORT
print "message:", MESSAGE

pids = process_list()
MESSAGE = MESSAGE + str(pids)

sock = socket.socket(socket.AF_INET, # Internet
                     socket.SOCK_DGRAM) # UDP
sock.sendto(MESSAGE, (UDP_IP, UDP_PORT))
