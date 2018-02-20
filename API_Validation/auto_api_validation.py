import os
import urllib2
import urllib
import pycurl
import base64
import json

req = 'http://portaluat.vyoma-labs.com/api/V2/hostname/VLabMaster-250'
response = urllib.urlopen(req)
the_page = response.read()

print the_page



# curl "http://portaluat.vyoma-labs.com/api/V2/hostname/<host_name>" |jq

# curl "http://portaluat.vyoma-labs.com/api/V2/host/<host_id>?data=all&data=incl_players" |jq
