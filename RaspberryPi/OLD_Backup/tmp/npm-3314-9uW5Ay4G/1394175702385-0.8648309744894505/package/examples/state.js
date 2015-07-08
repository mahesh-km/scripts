#!/usr/bin/env node-canvas
/*jslint indent: 2, node: true */
"use strict";

// Original code at:
// https://github.com/LearnBoost/node-canvas/blob/master/examples/state.js

var Canvas = require('../lib/canvas');
var canvas = new Canvas(150, 150);
var ctx = canvas.getContext('2d');
var fs = require('fs');

var eu = require('./util');

ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.scale(4, 4);

ctx.fillRect(0, 0, 150, 150);   // Draw a rectangle with default settings
ctx.save();                     // Save the default state

ctx.fillStyle = '#09F';         // Make changes to the settings
ctx.fillRect(15, 15, 120, 120); // Draw a rectangle with new settings

ctx.save();                     // Save the current state
ctx.fillStyle = '#FFF';         // Make changes to the settings
ctx.globalAlpha = 0.5;
ctx.fillRect(30, 30, 90, 90);   // Draw a rectangle with new settings

ctx.restore();                  // Restore previous state
ctx.fillRect(45, 45, 60, 60);   // Draw a rectangle with restored settings

ctx.restore();                  // Restore original state
ctx.fillRect(60, 60, 30, 30);   // Draw a rectangle with restored settings

canvas.vgSwapBuffers();
eu.handleTermination();
eu.waitForInput();
