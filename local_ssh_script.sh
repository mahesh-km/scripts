#!/bin/sh

IP=""
USER=""
TYPE=""


read_ip() {
   echo "Enter the ip last part (eg: 201,204,206)"
   read IP
}

ssh_to_box() {
   ssh $USER@192.168.1.$IP -o StrictHostKeyChecking=no
} 

echo "1 for VMC || 2 for DDIS"
read TYPE

if [ $TYPE == "1" ]; then
   USER="pi"    
   read_ip && ssh_to_box
elif [ $TYPE == "2" ]; then 
   USER="ddis"
   read_ip && ssh_to_box
fi


