#!/usr/bin/env node-canvas
/*jslint indent: 2, node: true */
/*global requestAnimationFrame: true, Image: true */
"use strict";

var net = require('net');
var HOST = 'localhost';
//var HOST = 'kacantoutsb.dyndns-ip.com';
var PORT = 2000;

var client = new net.Socket();

var fs = require('fs');
//var Canvas = require('../lib/canvas');
var Canvas = require('openvg-canvas');
var Image = Canvas.Image;
var canvas = new Canvas();
var ctx = canvas.getContext('2d');
var eu = require('./util');

var x = 0;  var y = canvas.height*3/4;
ctx.clearRect(0, 0, canvas.width, canvas.height);

var image = new Image();
var image_ready = true;

var string = " ";
var clerk = '', transaction = '', adult = '', child = '', tclass = '', 
    date ='', fare ='', from ='', to ='', month ='', train = " ",
    station = ' ';

function getStation(code) {
    //console.log('in getStation: ' , code);
    var start = stations.search('<' + code + '>') + 5;
    var end = stations.search('</' + code + '>') -1;
    var station = stations.substring(start,end);
    //console.log(station.toString());
    return station;
}

function displayName(clerk, x, y) {
   ctx.font = '14pt San-Sarif';
   ctx.fillStyle = "yellow";
   ctx.fillText(clerk ,x,y);
}

function displayFrom(from,x,y) {  // From Station
   ctx.font = '12pt San-Sarif';
   ctx.fillStyle = "green";
   ctx.fillText(from,x,y);
}

function displayTo(to,x,y) {  // To Station
   ctx.font = '12pt San-Sarif';
   ctx.fillStyle = "green";
   ctx.fillText(to,x,y);
}

function displayClass(tclass, x, y) {  // Class
   ctx.font = '15pt San-Sarif';
   ctx.fillStyle = "blue";
   ctx.fillText(tclass,x,y);      
}

function displayDate(date, x, y) {   // date -- send as date/month
   ctx.font = '15pt San-Sarif';
   ctx.fillStyle = "blue";
   ctx.fillText(date,x,y);        
}

function displayType(type, x, y) {   // Type of travel
   ctx.font = '10pt San-Sarif';
   ctx.fillStyle = "blue";
   ctx.fillText(type,x,y);        
}

function displayAdult(adult, x, y) {   // Adult
   ctx.font = '15pt San-Sarif';
   ctx.fillStyle = "blue";
   ctx.fillText(adult,x,y);        
}

function displayChild(child, x, y) {   // Child
   ctx.font = '15pt San-Sarif';
   ctx.fillStyle = "blue";
   ctx.fillText(child,x,y);        
}

function displayFare(fare, x, y) {   // Fare
   ctx.font = '15pt San-Sarif';
   ctx.fillStyle = "blue";
   ctx.fillText(fare,x,y);        
}

// synchronous read TrainDB.xml file
var stations = fs.readFileSync('TrainDB.xml','utf8')

function parseline(inputline) {
        var value = inputline.toString();
        value = value.substring(1);  // remove the $
        //console.log("in parseline: element:", value);
        if (value.slice(0,2) == "15") {
            clerk = value.substring(4,value.indexOf(':')); // clerk
            //console.log("clerk:" , clerk);
            //displayName(clerk, x+170, y+55);
        };
        if (value.slice(0,2) == "01") {
            from = value.substring(4,value.indexOf(":")); // from
            //console.log("from: ", from);
            if (from.length > 0) {
                from = getStation(from.replace(/ /g,''));
                //console.log("from Station: ", from);
		//displayFrom(from, x+100, y+200);
                };
        };
        if (value.slice(0,2) == "02") {
            to = value.substring(4,value.indexOf(":")); // to
            //console.log("to: ", to);
            if (to.length > 0) {
                to = getStation(to.replace(/ /g,''));
                //console.log("to Station: ", to);
                //displayTo(to, x+700, y+200);
                };
        };
        if (value.slice(0,2) == "03") {
            date = value.substring(4,value.indexOf(":")); // date
            //console.log("date: ", date);
            date = date;
            //displayDate(date, x+230, y+450);
        };
        if (value.slice(0,2) == "04") {
            month = value.substring(4,value.indexOf(":")); // month
            date = date + '/' + month;
            //console.log("month: ", month);
            //displayDate(date, x+230, y+450);
        };

        if (value.slice(0,2) == "05") {
            adult = value.substring(4,value.indexOf(":")); // adult
            //console.log("adult: ", adult);
	    //displayAdult(adult, x+690, y+450);
        };
         if (value.slice(0,2) == "06") {
            child = value.substring(4,value.indexOf(":")); // child
            //console.log("child: ", child);
	    //displayChild(child, x+815, y+450);
        };
         if (value.slice(0,2) == "07") {
            train = value.substring(4,value.indexOf(":")); // train
            //console.log("train: ", train);
            switch(train)
            {
                case 'O':
                        train = "ORDINARY"; break;
                case 'E':
                        train = "EXPRESS"; break;
                case 'S':
                        train = "SUPERFAST"; break;
                case 'T':
                        train = "MMTS"; break;
                case 'E':
                        train = "COMBINED"; break;
                case 'E':
                        train = "RAJDHANI"; break;
                case 'E':
                        train = "SHATABDI"; break;
                default:
                        train = "";

            };

            //console.log("train: ", train);

        };
        if (value.slice(0,2) == "08") {
            fare = value.substring(4,value.indexOf(":")); // fare
            //console.log("fare: ", fare);
	    //displayFare(fare, x+935, y+450);
        };
        if (value.slice(0,2) == "09") {
            tclass = value.substring(4,value.indexOf(":")); // class
            //console.log("class: ", tclass);
        };
        if (value.slice(0,2) == "12") {
            train = value.substring(4,value.indexOf(":")); // Transaction
            //console.log("transaction: ", transaction);
            switch(train)
            {
                case 'SPLC':
                        transaction = "SPECIAL CANCEL"; break;
                case 'PLAT':
                        transaction = "PLATFORM";
                        break;
                case 'NI':
                        transaction = "NON-ISSUE"; break;
                case 'CANC':
                        transaction = "CANCELLATION"; break;
                case 'ST':
                        transaction = "SEASON TICKET"; break;
                case 'BPT':
                        transaction = "BPT TICKET"; break;
                case 'SF':
                        transaction = "SUPERFAST TICKET"; break;
                case 'JRNY':
                        transaction = "JOURNEY"; break;
                case 'CARD':
                        transaction = "CARD"; break;
                case 'MMQT':
                        transaction = "MULTIRT"; break;
                case 'RRTT':
                        transaction = "RAIL/TOURIST"; break;
                case 'PART':
                        transaction = "PARTIAL CANCEL"; break;
                default:
                        transaction = "";
            };

            //console.log("transation: ", transaction);
            //displayType(transaction, x+475, y+450);

        };
        if (value.slice(0,2) == "13") {
            //console.log("CLEAR");
 	    transaction= "";
 	    adult = "";
 	    child = "";
 	    tclass = "";
 	    date = "";
 	    fare = "";
 	    to = "";
 	    train = "";
            month = "";
        };

}

function update() {
    ctx.drawImage(image, x, y, tx, ty); // 1080 x 480
    displayName(clerk, x+140, y+37);
    displayFrom(from, x+60, y+200);
    displayTo(to, x+450, y+200);
    displayClass(tclass, x+65, y+320);
    displayDate(date, x+180, y+320);
    displayType(transaction, x+300, y+320);
    displayAdult(adult, x+490, y+320);
    displayChild(child, x+ 570, y+320);
    displayFare(fare, x+690, y+320);
};

// load the background image
image.src = fs.readFileSync('./images/VMC-UTS-background.png');

//some debug statements
/*
console.log('screen width' , canvas.width);
console.log('screen height' , canvas.height);
console.log('ticket window width' , image.width);
console.log('ticket window height' , image.height);
*/

// the ticketing information window is 25% of the whole screen
var tx = canvas.width;
var ty = canvas.height / 4;
ctx.drawImage(image, x , y, tx, ty); // 1080 x 480

//displayName("Ganesha", x+170, y+55);
//displayFrom(getStation("SBC"), x+60, y+200);
//displayTo("Chennai", x+650, y+200);
//displayClass("II", x+65, y+450);
//displayDate("31/12", x+230, y+450);
//displayType("Express", x+425, y+450);
//displayAdult("2", x+690, y+450);
//displayChild("0", x+815, y+450);
//displayFare("123.45", x+935, y+450);
//

client.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
});

// Add a 'data' event handler for the client socket
// data is what the vscout sent to this socket
var chunk = " ";
var d_index;

client.on('data', function(data) {

    //console.log('data: ' , data);
    chunk += data.toString();
    //console.log('chunk: ' , chunk);
    d_index = chunk.indexOf('^');

    while (d_index > -1) {
         string = chunk.substring(0,d_index);
         console.log('data: ', string);
         parseline(string);
         update();
         canvas.vgSwapBuffers();
         chunk = chunk.substring(d_index+1);
         d_index = chunk.indexOf('^');
    }

});


// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});


canvas.vgSwapBuffers();
eu.waitForInput();
