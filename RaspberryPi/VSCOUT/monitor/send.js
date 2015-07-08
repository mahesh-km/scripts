var PORT = 33333;
var HOST = '162.243.16.178';
var REPEAT = 5 * 60 * 1000; // how often (millisecs) we send the status info

var util = require('util');

var dgram = require('dgram');
var sysinfo = require("sysinfo");
var os = require("os");

var message = new Buffer('Vyoma Rocks!\n');
var client = dgram.createSocket('udp4');
var sent = 0;

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

function send() {
    client.send(message, 0, message.length, PORT, HOST, function() {
      sent++;
    });
};


// Set up an interval timer that will periodically send the number of sent
// packets to the console
setInterval(function() {
   	
   data = "vscout real-time system information from KACANTOUTSB\n";
   data += "systemtime: " + getDateTime() + "\n" ;
   data += "hostname: " + os.hostname() + "\n" ;
   data += "uptime: " + os.uptime() + "\n";
   data += "loadavg: " + os.loadavg() + "\n";
   data += "totalmem: " + os.totalmem() + "\n";
   data += "freemem: " + os.freemem() + "\n";
   data += "networkInterfaces: " + JSON.stringify(os.networkInterfaces()) + "\n";
   data += "\n";
   message = new Buffer(data);

   send(); 

   console.log('Sent ', sent, 'at ', getDateTime());
}, REPEAT);


