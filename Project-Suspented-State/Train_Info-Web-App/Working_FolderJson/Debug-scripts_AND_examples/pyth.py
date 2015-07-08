


import urllib2
import json
#import csv

url = "http://localhost:8080/TrainStatus/TrainStatusServlet?StationCode=SBC&json=true"
data = urllib2.urlopen(url).read()
data = json.loads(data)

print data;

with open('/home/vyoma/data.txt', 'w') as outfile:
  json.dump(data, outfile)