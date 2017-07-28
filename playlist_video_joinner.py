#!/usr/bin/python

###################################################
#This script helps to join the all playlist videos.
#
#
####################################################

import libxml2
from collections import deque
import os

# home folder
HOME_DIR="/home/vyoma"
# Media folder
MEDIA_DIR="/home/vyoma/playlist/VTPLMedia/Media/"

# playlist xml file 
MEDIA_XML_PLAYLIST="/home/vyoma/playlist/VTPLMedia/Config/playlist.xml"

doc = libxml2.parseFile(MEDIA_XML_PLAYLIST)

result = doc.xpathEval2("/MediaContent/Media/SeqNo/text() | /MediaContent/Media/FileName/text()")

queue = deque(result)
fdict = [] 
videos= {}

for i in result:
	fname = queue.popleft()
	seqno = queue.popleft()
	print str(seqno) + " : " + str(fname)	
        videos[int(str(seqno))] = str(fname)
	if len(queue) < 1 :
		break
	
index = [x for x in videos.keys()] 
index.sort()

print "Starting merging videos"

try:
    os.mkfifo("/tmp/vpipe")
except:
    print "fifo error ,fifo maybe existing "


os.system("ffmpeg -loglevel quiet -i /tmp/vpipe -sameq -y " + HOME_DIR + "ads.mpg"  + " > /mnt/ffmpeg_log 2>&1 & ")

l = open("/tmp/vpipe", 'w+')

for i in index:

    print " merging file  " + str(i) + "   "  + videos[i]
    path = MEDIA_DIR+videos[i]
    ads_mpg = "home/vyoma/ads.mpg"
    
    os.system("cat " "/home/vyoma/ads.mpg " + "'" + path + "'" + "> /home/vyoma/ads_tmp.mpg")
    os.system("cat " "/home/vyoma/ads.mpg  /home/vyoma/ads_tmp.mpg " "> /home/vyoma/ads.mpg")

    #with open(path,'r') as f:
    #    for x in iter(lambda : f.read(32768), ""):
    #        l.write(x)


l.close()
os.remove("/tmp/vpipe")
print "final media file ready "   

