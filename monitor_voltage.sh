#!/bin/sh

# script will check voltage and temp evey seconds.

sudo touch /home/pi/voltage_check.log

DATE=$(date)
LOG="/home/pi/voltage_check.log"

check_voltage() {
   DATE=$(date)
   echo -e "\n$DATE" | tee -a $LOG
   for id in core sdram_c sdram_i sdram_p;
   do
     echo -e "$id:\t$(vcgencmd measure_volts $id)" | tee -a $LOG
   done
   echo -e "Temperature : $(vcgencmd measure_temp)\n"  | tee -a $LOG
}

echo -e "\n voltage check started on $DATE\n" | tee $LOG

while :
do
  sleep 1
  check_voltage
done
