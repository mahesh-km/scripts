#!/bin/bash

# Backup Databases
backup_parent="db_snapshots"
time_stamp=`date +%Y%m%d_%H%M`

mkdir -p $backup_parent
mkdir $backup_parent/$time_stamp

cat backup.db | while read db
do
mysqldump $db | sed -e 's/DEFINER=[^*]*\*/\*/' > $backup_parent/$time_stamp/$db.sql
done

tar -cvzf $backup_parent/$time_stamp.tgz $backup_parent/$time_stamp/
rm -rf $backup_parent/$time_stamp/

# Delete files older than 15 days
find $backup_parent/*.tgz -mtime +15 -exec rm {} \;
