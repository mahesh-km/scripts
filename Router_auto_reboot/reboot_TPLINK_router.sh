#!bin/sh

# reboot router remotly.

# reboot TPLINK
curl -L --user admin:monit2013 http://192.168.1.1/userRpm/SysRebootRpm.htm?Reboot=reboot --referer "http://192.168.1.1/userRpm/SysRebootRpm.htm/" > /dev/null
