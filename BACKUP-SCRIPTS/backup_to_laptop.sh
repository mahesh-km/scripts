#!/bin/sh
echo -e "\n Please enter the Ip address"
read IP

# backup software-Backup folder
sudo rsync -avz Software-Backup bhadr@$IP:/home/bhadr/Documents/

# backup Current working folder.
sudo rsync -avz Current_Working bhadr@192.168.1.38:

# end


