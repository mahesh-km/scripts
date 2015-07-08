#! /usr/bin/python
import urllib2
import json
import cgi, cgitb

response = urllib2.urlopen('http://localhost:8080/TrainStatus/TrainStatusServlet?StationCode=SBC&json=true')
data = json.load(response)   
print data
