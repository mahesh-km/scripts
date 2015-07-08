#!/bin/bash
#script for taking backup from laptop to main dev-pc

echo "starting sync from LAP................................."
echo "sync LiveCD_World"

rsync -azv /media/HDD/LiveCD_World/  root@192.168.1.100:/opt/LiveCD_World/


echo "LiveCD_World sync complitted"

echo "--------------------------------------------------------------------------------------"

echo "Start Sync Current working"

rsync -azv /media/HDD/Current_Working/ root@192.168.1.100:/media/HDD500/Current_Working/ 

echo "Current working Sync Complitted "

echo "All sync complitted sucessfully !"






