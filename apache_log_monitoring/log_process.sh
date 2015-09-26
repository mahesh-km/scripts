#!/bin/sh

# this script for process apache log in a specific date,
# and filter ip address also check that ip already added 
# to iptable or not, if not write purticular ip into a file

# enter date
DATE="25"

# enter Month
MONTH="Sep"

# enter the year
YEAR="2015"

# log path
LOG="/home/bhadr/apache_logs/*.log"

# ip address file
IP_FILE="/home/bhadr/notadded_ipaddress_collect"

echo " " | tee -a $LOG

for ip in `sed -n "/${DATE}\/${MONTH}\/${YEAR}/,$ p" $LOG | grep -e "xmlrpc.php" -e "wp-login.php" | grep -v -e "EN(" | awk '{print $1}' | sort | uniq`
do
  CHECK_IP_EXIST=`sudo iptables -L fail2ban-wp-auth -n -v | grep $ip`
  # CHECK_IP_EXIST=`sudo iptables -L | grep $ip`

  if [ -z "$CHECK_IP_EXIST" ]; then
     echo $ip | tee -a $IP_FILE
  fi

done

# end

