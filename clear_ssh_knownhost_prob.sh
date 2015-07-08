#!/bin/sh

HOME_DIR="/home/vyoma"
echo "please enter the ip or domain name"
read IP
/usr/bin/ssh-keygen -f "$HOME_DIR/.ssh/known_hosts" -R "$IP"

