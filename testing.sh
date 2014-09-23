
#!/bin/sh

# checking all the second partion config files correct or not

#all the configuration files 
#normal livecd configuration file

hostname=`cat /mnt/config/character/hostname`
pass=`cat /mnt/config/character/pass`
screen=`cat /mnt/config/character/screen`
ssid=`cat /mnt/config/character/SSID`
state=`cat /mnt/config/character/state`
ticketing_type=`cat /mnt/config/character/ticketing_type`

#sync livecd configuration files

playermode=`cat /mnt/config/character/playermode`
playertype=`cat mnt/config/character/playertype`

#merge livecd configuration files

livecdmode=`cat /mnt/config/character/livecdmode`

#clock configuration file

clock=`cat /mnt/config/character/livecdmode`
clock_glimpse=`cat /mnt/config/character/clock_glimpse`
clock_interval=`cat /mnt/config/character/clock_interval`
#M/Monit id file
current_id=`cat /mnt/config/character/clock_intervel`
echo "**********Live Cd Second Partion Configuration Details**********"
echo ""
echo "Host Name      :"$hostname
echo "State Selected :"$state
echo "Ticketing Type :"$ticketing_type
echo "No. of Screens :"$screen
echo "Wifi Password  :"$pass
echo "SSID           :"$ssid
echo ""
echo "*****SYNC configurations*****"
echo ""
echo "LiveCD Mode    :"$livecdmode
echo "Player Mode    :"$playermode
echo "Player Type    :"$playertype
echo ""
echo "*****Clock Configurations*****"
echo ""
echo "Clock Status   :"$clock
echo "Clock Glimpse  :"$clock_glimpse
echo "clock_interval :"$clock_interval

echo "*****M/Monit Current-id*****"
echo "Current-id     :"$current_id


echo "*****Debugging results*****"
echo ""
echo ""
if [ "$livecdmode" == "nonsync" ]
then 
    echo "This LiveCD configured as Nonsync"

elif [ "$livecdmode" == "sync" ]
then
    echo "This LiveCD configured as Sync"
    if [ -f /mnt/file/ads.mpg]
    then
    	echo "ads.mpg found!"
    else
	echo "ads.mpg could not found!"
    fi
fi

#clock    

if [ -d /mnt/playlist/clock]
then
    echo "*****Clock*****"
    echo "clock folder found inside playlist!"
    ll /mnt/playlist/clock

fi
echo "-------all config files listed------------------------"

     ll /mnt/config/character/

























