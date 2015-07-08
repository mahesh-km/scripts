#!/bin/sh

SERVICE='omxplayer'
while true; do
  if ps ax | grep -v grep | grep $SERVICE > /dev/null
  then
   echo "runing" # sleep 1
  else
   $SERVICE -o hdmi --win "20 20 1250 700" /home/pi/ads.mp4 &

fi
done
