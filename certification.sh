#!/bin/sh
#
# check cron and debug info. in vmc
#
# usage sh certification.sh <starting ip> <end ip>
# eg: sh certification.sh 201 210
#

i=$1
e=$2

test() {
   ping 192.168.1.$i -c 1 > /dev/null  
   if [ $? -eq 0 ]; then 
      echo "$i reachable"
      ssh -o StrictHostKeyChecking=no pi@192.168.1.$i "cat /etc/cron.d/vmc && date && uptime"
      read n
      #ssh -o StrictHostKeyChecking=no pi@192.168.1.$i "head /var/log/syslog"
      ssh -o StrictHostKeyChecking=no pi@192.168.1.$i "sudo sh /home/pi/scripts/debug.sh"
      read n
   fi
}

while : 
do
  test  
  i=`expr $i + 1` 
  if [ $i -gt $e ]; then
     i="250" && test
     exit 
  fi 
done

# end
