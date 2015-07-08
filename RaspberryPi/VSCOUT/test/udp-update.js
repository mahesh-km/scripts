//  chandra - oct 21, 2013
// continously monitor the rssi
//
//  chandra oct 31, 2013
//  cleaned up to print the json formatted output
//
// chandra nov 4, 2013
//  added udp update
//
// requires noble  -- npm install noble
// https://github.com/sandeepmistry/noble
// 
// to run
// sudo /opt/node/bin/node rssi-scan.js
//
//

var noble = require('./index');
var os = require("os");

var dgram = require('dgram');
var PORT = 33333;
var HOST = process.env.UDPSERVER;
console.log('host is  ' + HOST);
var client = dgram.createSocket('udp4');
global.message = new Buffer('Welcome ');

global.tag = '{'
  + '"timestamp": "",'
  + '"bsname"  : "",'
  + '"ipaddr"  : "",'
  + '"tagaddr" : "",'
  + '"tagrssi" : "",'
  + '"tagadvt" : ""'
  + '}';


noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning([],true);
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
  console.log('peripheral discovered:');
  //console.log('on -> discover: ' + peripheral);
  obj = JSON.parse(peripheral);

  //console.log('TimeStamp: ' + Date.now());
  //console.log('Basestation: ' + os.hostname());
  //console.log('IP Addr: ' + os.networkInterfaces().eth0[0].address);
  //console.log('Addr: ' + obj.uuid);
  //console.log('RSSI: ' + obj.rssi);
  //console.log('ADVT: ' + obj.advertisement);


  temptag = global.tag;
  tagobj = JSON.parse(temptag);
  tagobj.timestamp = Date.now();
  tagobj.bsname = os.hostname();
  tagobj.ipaddr = os.networkInterfaces().eth0[0].address;
  tagobj.tagaddr= obj.uuid;
  tagobj.tagrssi= obj.rssi;
  tagobj.tagadvt= obj.advertisement;

  console.log('tag data: '+ JSON.stringify(tagobj));

  //global.message = JSON.stringify(tagobj);
  var msg = new Buffer(JSON.stringify(tagobj));
  client.send(msg, 0, msg.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST + ':' + PORT);
  });

  console.log();
});

