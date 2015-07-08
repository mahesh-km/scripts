#!/bin/sh

# get rid of the cursor so we don't see it when videos are running
setterm -cursor off

# set here the path to the directory containing your videos
VIDEOPATH="/home/pi/Media" 


while true
do

   for entry in $VIDEOPATH/*
     do
      avconv -re -i "$entry" -vcodec copy -f avi -an udp://239.0.1.23:1234
     done
done
