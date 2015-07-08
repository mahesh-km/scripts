#!/usr/bin/env python

# This program reads the raw data and
#parses the information
#
# -*- coding: utf-8 -*-
import sys
import os 
import os.path
import string
import time
import types
import serial
from xml.etree import ElementTree


XML_HOME = "/home/pi/uts/"
#XML_HOME = "./"
traindbfile = XML_HOME + "TrainDB.xml"
Infoxmlfile = XML_HOME + "Info.xml" 
testDatafile = XML_HOME + "ttyS0"

#HOME = "/var/www/html/"
HOME = "./"
LIVE_DATA = HOME + os.path.sep + "screen1/livedata"
LIVE_DATA2 = HOME + os.path.sep + "screen2/livedata"


def transaction(s):
   s = s.replace(' ','')    # remove blank spaces
   if (s == "SPLC"):
    return "SPECIAL CANCEL"
   elif (s == "PLAT"):
    return "PLATFORM"
   elif (s == "NI"):
    return "NON-ISSUE"
   elif (s == "CANC"):
    return "CANCELLATION"
   elif (s == "ST"):
    return "SEASON TICKET"
   elif (s == "BPT"):
    return "BPT TICKET"
   elif (s == "SF"):
    return "SUPERFAST TICKET"
   elif (s == "JRNY"):
    return "JOURNEY"
   elif (s == "CARD"):
    return "I CARD"
   elif (s == "MMQT"):
    return "MULTIRT"
   elif (s == "RRTT"):
    return "RAIL/TOURIST"
   elif (s == "PART"):
    return "PARTIAL CANCEL"
   else:
    return "INVALID"



def trainType(s):
   if (s == "O"): 
      return "ORDINARY"
   elif (s == "E"):
      return "MAIL-EXP"
   elif s == "S": 
      return "SUPERFAST"
   elif s == "T": 
      return "MMTS"
   elif s == "C":
      return "COMBINED"
   elif s == "R": 
      return "RAJDHANI"
   elif s == "S": 
      return "SHATABDI"
   else:
      return "INVALID"

def get(sCode):
	print "inside get()" + sCode
	rvalue = sCode
	# remove the spaces in the train code
	sCode = sCode.replace(' ','')
	#check if the scode is alphabet or not
	if not sCode.isalpha():
	    pass
	else:
	    try:
	        tree = ElementTree.parse(traindbfile)
        	for sCode_ in tree.findall(sCode):
		    print "inside for loop"
		    rvalue = sCode_.text
		    if (sCode_.text != '') or sCode_.text != None:
	                rvalue = unicode.encode(sCode_.text,"utf-8")
            except TypeError:
	        pass 
	return rvalue

def update(field, value):
	try:
	    print "update:"+field
 	    print "update:"+value
	    fileName = LIVE_DATA + os.path.sep + string.lower(field)
	
	    f = open(fileName,'w+')
	    f.write(value)
	    f.flush()
	    f.close()
	    # time.sleep(1)	
	except TypeError:
	    pass

#with open(testDatafile) as fh:
print "Starting extract data from serial port program"
fh = serial.Serial(0)
#fh = open(testDatafile) 



#for char in fh:
#  date = ""    # keep a copy of the date
#  month = ""  # and the month to update the display field
 
date = "date"
month = "month"
 
while 1:
    start = fh.read(1)
    if start == "":
	   break
   
    print "Start : " + start  
    while start != "$":
	start = fh.read(1)
 
    type1 = (fh.read(2))
    print type1
    try:
        type = (int)(type1)
    except ValueError:
	continue
    if type==0:                     # nothing
     stype = "nothing"
    elif type == 1:                 # From Station
      size = (int)(fh.read(2))
      #print size
      value = ""
      data = fh.read(size)
      stationcode = data[0:4]
      #check if the station code is alpha or not
      #if stationcode
      print data
      print stationcode
      stationname =  get(stationcode)
      #print stationname
      #print "From: " + stationcode + " : " + stationname
      update("From",stationname)

    elif type == 2:                   # To Station
      size = (int)(fh.read(2))
      #print size
      value = ""
      data = fh.read(size)
      stationcode = data[0:4]
      stationname =  get(stationcode)
      print stationcode
      #print stationname
      #print "To: " + stationcode + " : " + stationname or "NON STATION"
      #print "To: " + stationcode + ": " + stationname
      update("To",stationname)

    elif type == 3:               # Date
      size = (int)(fh.read(2))
      #print size
      value = ""
      data = fh.read(size)
      value = data[0:-2]
      date = value
      dateVal = date + "/" + month
      print "Date: "+ dateVal	
      update("Date",dateVal) 
  
    elif type == 4:                    # Month
      size = (int)(fh.read(2))
      #print size
      value = ""
      data = fh.read(size)
      value = data[0:-2]
      month = value
      dateVal = date + "/" + month
      print "Month :" + dateVal
      update("Date",dateVal)

    elif type == 5:                  # Adult
      size = (int)(fh.read(2))
      #print size
      value = ""
      data = fh.read(size)
      value = data[0:-2]
      print "Adult :" + value     # value of the data
      update("Adult",value)

    elif type == 6:                      # Child
      size = (int)(fh.read(2))
      #print size
      value = ""
      data = fh.read(size)
      value = data[0:-2]
      print "Child :" + value     # value of the data
      update("Child",value)

    elif type == 7:                    # Train
      size = (int)(fh.read(2))
      #print size
      value = ""
      data = fh.read(size)
      value = data[0:-2]
      TType = trainType(value) 
      print "Train Type : " + TType 
      update("Train",TType)

    elif type == 15:                    # Train
      size = (int)(fh.read(2))
      #print size
      value = ""
      data = fh.read(size)
      value = data[0:-2]
      value_ = str.split(value,":")[0]
      print "Clerk Name : " + value_ 
      update("clerk",value_)
   
    elif type == 8:                      # Fare
      try:
          size = (int)(fh.read(2))
      except ValueError:
	pass	
      #print size
      value = ""
      data = fh.read(size)
      value = data[0:-2]
      print "Fare : " + value     # value of the data
      update("Fare",value)

    elif type == 9:                    # Class
      size = (int)(fh.read(2))
      #print size
      value = ""
      data = fh.read(size)
      value = data[0:-2]
      print "Class : " + value     # value of the data
      update("Class",value)

    elif type == 10:
     stype = "Blank"

    elif type == 11:
     stype = "ThinUTS"

    elif type == 12:                   # Transaction
      size = (int)(fh.read(2))
      #print size
      value = ""
      data = fh.read(size)
      value = data[0:-2]
      #print value     # value of the data
      tvalue = transaction(value)
      print "Transaction : " + tvalue 
      update("Transaction",tvalue)

    elif type == 13:                      # Clear
      try:
          value = data[0:-2]
      except NameError:
          pass
      # clear all


