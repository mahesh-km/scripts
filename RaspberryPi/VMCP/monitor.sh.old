#!/bin/bash

if pgrep searchd | grep "[0-9]" 
then
  donothing=0
else
  cd /home/pi
  python -m SimpleHTTPServer &
fi

while true; do
  echo "capturing screen"
  /home/pi/raspi2png -h 480 -w 640 -p screen.png

  hostname > /home/pi/info.txt
  date >> /home/pi/info.txt

  counter="kacantoutsb - "
  title=`date`
  #convert screen.png -font Palatino -pointsize 25 -background Khaki label:"$counter ${title}" -gravity Center +swap -append screen.jpg
  #convert screen.png -background Khaki label:"$counter ${title}" -gravity Center +swap -append screen.jpg

  sleep 60 # sleeping 1 minute
done
