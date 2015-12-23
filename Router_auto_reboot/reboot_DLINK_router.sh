#!bin/sh

# reboot router remotly.

# reboot Dlink
curl -u admin:monit2013 -m 10 "http://192.168.1.1/reboot.cgi?reset=false"

