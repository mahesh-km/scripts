#!/bin/sh
echo -e "\n Please enter the Ip address"
read IP

# backup software-Backup folder
sudo rsync -avz /mnt/9a818466-feda-4606-acde-723b5e9ccf9e/Software-Backup bhadr@$IP:/home/bhadr/Documents/

# backup Current working folder.
sudo rsync -avz --delete /mnt/9a818466-feda-4606-acde-723b5e9ccf9e/Current_Working bhadr@$IP:

# end


