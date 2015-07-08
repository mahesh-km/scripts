# starting clock

clock=`cat /mnt/config/character/clock`
echo $$ > /home/vyoma/vyoma-media/logs/clock.pid

if [ "$clock" == "on" ]
then

	exec python /home/vyoma/vyoma-media/bin/clock.py
fi


while true
do
sleep 3600
done
