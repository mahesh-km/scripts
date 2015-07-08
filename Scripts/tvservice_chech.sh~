#!/bin/bash

echo "checking tvservice"

tvservice -s | awk '{print $9}'  > /home/pi/reslution
RES=`cat /home/pi/reslution`
echo "$RES"
RES_NEEDED="1920x1080"

if [ $RES == "1920x1080"  ]
then
    echo  "reslution is good"
else
   echo "reslutio is bad $RES"
#    sudo reboot
fi

