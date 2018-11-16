#!/bin/bash

# Backup Information : Rsync Share

backuphost='monit.vyoma-media.com'
backupuser='root'
backupid='/home/srvbackup/dash_backup'


################### Backup Files/Folders

cat backup.files | while read line
do
rsync -avz $line -e ssh $backupuser@$backuphost:$backupid/
done

################### Backup Databases
mkdir mysql_dump
#
cat backup.db | while read line
do
filename=$line.sql
mysqldump -u root -p <password> $line>mysql_dump/$filename
done
#
tar -cvzf mysql_dump.tgz mysql_dump/
rsync -avz --delete mysql_dump.tgz -e ssh $backupuser@$backuphost:$backupid/

rm -rf mysql_dump
rm -rf mysql_dump.tgz

