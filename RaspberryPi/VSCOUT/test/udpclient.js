var PORT = 33333;
var HOST = '192.6.19.73';

var sys = require("sys");
var dgram = require('dgram');
var message = new Buffer('My KungFu is Good!');

var client = dgram.createSocket('udp4');

// interval example - 5x output every 2secs using setInterval
function interval_example() {
     send(message);
  }, 2000);


function send(message) {
client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);
    });
}


interval_example();

