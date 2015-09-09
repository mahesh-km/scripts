#!/bin/sh

sudo touch /var/log/vmc/voltage_check.log

DATE=$(date)
LOG="/var/log/vmc/voltage_check.log"

check_voltage() {
   for id in core sdram_c sdram_i sdram_p;
   do
     echo -e "$id:\t$(vcgencmd measure_volts $id)" | tee -a $LOG
   done
}

echo -e "\n voltage check started on $DATE" | tee $LOG

while :
do
  sleep 1
  echo -e "\n"
  check_voltage
done
