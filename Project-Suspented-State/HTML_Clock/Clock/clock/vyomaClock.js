
//coclk .js
window.Clock = function(options) {
	return this.init(options);
}


Clock.config = {
	tickDelay: 1000,
	longTickDelay: 15000,
	defaultRadius: 225,
	renderRadius: 100,
	defaultSkin: "chunkySwiss",
	
	showSecs: true,
	showAmPm: true,

	skins:	{
		
		SswissRail: {
			outerBorder: { lineWidth: 1, radius:95, color: "brown", alpha: 1 },		
			smallIndicator: { lineWidth: 2, startAt: 88, endAt: 92, color: "white", alpha: 1 },
			largeIndicator: { lineWidth: 4, startAt: 79, endAt: 92, color: "white", alpha: 1 },
			hourHand: { lineWidth: 6, startAt: -15, endAt: 50, color: "black", alpha: 1 },
			minuteHand: { lineWidth: 4, startAt: -15, endAt: 75, color: "black", alpha: 1 },
			secondHand: { lineWidth: 1, startAt: -20, endAt: 85, color: "white", alpha: 1 },
			secondDecoration: { lineWidth: 1, startAt: 70, radius: 4, fillColor: "red", color: "red", alpha: 1 }
		},
		chunkySwiss: {
			outerBorder: { lineWidth: 4, radius:97, color: "black", alpha: 1 },
			smallIndicator: { lineWidth: 4, startAt: 89, endAt: 93, color: "black", alpha: 1 },
			largeIndicator: { lineWidth: 8, startAt: 80, endAt: 93, color: "black", alpha: 1 },
			hourHand: { lineWidth: 12, startAt: -15, endAt: 60, color: "black", alpha: 1 },
			minuteHand: { lineWidth: 10, startAt: -15, endAt: 85, color: "black", alpha: 1 },
			secondHand: { lineWidth: 4, startAt: -20, endAt: 85, color: "red", alpha: 1 },
			secondDecoration: { lineWidth: 2, startAt: 70, radius: 8, fillColor: "red", color: "red", alpha: 1 }
		},
		chunkySwissOnBlack: {
			outerBorder: { lineWidth: 4, radius:97, color: "white", alpha: 1 },
			smallIndicator: { lineWidth: 4, startAt: 89, endAt: 93, color: "white", alpha: 1 },
			largeIndicator: { lineWidth: 8, startAt: 80, endAt: 93, color: "white", alpha: 1 },
			hourHand: { lineWidth: 12, startAt: -15, endAt: 60, color: "white", alpha: 1 },
			minuteHand: { lineWidth: 10, startAt: -15, endAt: 85, color: "white", alpha: 1 },
			secondHand: { lineWidth: 4, startAt: -20, endAt: 85, color: "red", alpha: 1 },
			secondDecoration: { lineWidth: 2, startAt: 70, radius: 8, fillColor: "red", color: "red", alpha: 1 }
		}

	},

	
	isIE: !!document.all,

	
	clockTracker: {},

	
	noIdCount: 0
};


Clock.prototype = {

	
	init: function(options) {
		
		this.canvasId       = options.canvasId;
		this.skinId         = options.skinId || Clock.config.defaultSkin;
		this.displayRadius  = options.displayRadius || Clock.config.defaultRadius;
		this.showSecondHand = typeof options.showSecondHand == "boolean" ? options.showSecondHand : true;
		this.gmtOffset      = (options.gmtOffset != null && options.gmtOffset != '') ? parseFloat(options.gmtOffset) : null;
		this.showDigital    = typeof options.showDigital == "boolean" ? options.showDigital : false;
		this.logClock       = typeof options.logClock == "boolean" ? options.logClock : false;
		this.logClockRev    = typeof options.logClock == "boolean" ? options.logClockRev : false;

		this.tickDelay      = Clock.config[ this.showSecondHand ? "tickDelay" : "longTickDelay" ];

		
		this.canvas = document.getElementById(this.canvasId);

		
		this.canvas.setAttribute("width",this.displayRadius*2);
		this.canvas.setAttribute("height",this.displayRadius*2);
		this.canvas.style.width = this.displayRadius*2 + "px";
		this.canvas.style.height = this.displayRadius*2 + "px";

		
		this.renderRadius = Clock.config.renderRadius;
		this.scale = this.displayRadius / this.renderRadius;

		
		this.ctx = this.canvas.getContext("2d");
		this.ctx.scale(this.scale,this.scale);

		
		Clock.config.clockTracker[this.canvasId] = this;

		
		this.tick();

		return this;
	},

	
	fullCircleAt: function(x,y,skin) {
		this.ctx.save();
		this.ctx.globalAlpha = skin.alpha;
		this.ctx.lineWidth = skin.lineWidth;

		if (!Clock.config.isIE) {
			this.ctx.beginPath();
		}

		if (Clock.config.isIE) {
			
			this.ctx.lineWidth = this.ctx.lineWidth * this.scale;
		}

		this.ctx.arc(x, y, skin.radius, 0, 2*Math.PI, false);

		if (Clock.config.isIE) {
			
			this.ctx.arc(x, y, skin.radius, -0.1, 0.1, false);
		}

		if (skin.fillColor) {
			this.ctx.fillStyle = skin.fillColor
			this.ctx.fill();
		}
		else {
			
			this.ctx.strokeStyle = skin.color;
			this.ctx.stroke();
		}
		this.ctx.restore();
	},

	
	drawTextAt: function(theText,x,y) {
		this.ctx.save();
		this.ctx.font = '15px sans-serif';
		var tSize = this.ctx.measureText(theText);
		if (!tSize.height) tSize.height = 15; // no height in firefox.. :(
		this.ctx.fillText(theText,x - tSize.width/2,y - tSize.height/2);
		this.ctx.restore();
	},

	lpad2: function(num) {
		return (num < 10 ? '0' : '') + num;
	},

	tickAngle: function(second) {
		
		var tweak = 3; 
		if (this.logClock) {
			return second == 0 ? 0 : (Math.log(second*tweak) / Math.log(60*tweak));
		}
		else if (this.logClockRev) {
			
			second = (60 - second) % 60;
			return 1.0 - (second == 0 ? 0 : (Math.log(second*tweak) / Math.log(60*tweak)));
		}
		else {
			return second/60.0;
		}
	},

	timeText: function(hour,min,sec) {
		var c = Clock.config;
		return '' +
			(c.showAmPm ? ((hour%12)==0 ? 12 : (hour%12)) : hour) + ':' +
			this.lpad2(min) +
			(c.showSecs ? ':' + this.lpad2(sec) : '') +
			(c.showAmPm ? (hour < 12 ? ' am' : ' pm') : '')
		;
	},

	
	radialLineAtAngle: function(angleFraction,skin) {
		this.ctx.save();
		this.ctx.translate(this.renderRadius,this.renderRadius);
		this.ctx.rotate(Math.PI * (2.0 * angleFraction - 0.5));
		this.ctx.globalAlpha = skin.alpha;
		this.ctx.strokeStyle = skin.color;
		this.ctx.lineWidth = skin.lineWidth;

		if (Clock.config.isIE)
			
			this.ctx.lineWidth = this.ctx.lineWidth * this.scale;

		if (skin.radius) {
			this.fullCircleAt(skin.startAt,0,skin)
		}
		else {
			this.ctx.beginPath();
			this.ctx.moveTo(skin.startAt,0)
			this.ctx.lineTo(skin.endAt,0);
			this.ctx.stroke();
		}
		this.ctx.restore();
	},

	render: function(hour,min,sec) {
		
		var skin = Clock.config.skins[this.skinId];
		if (!skin) skin = Clock.config.skins[Clock.config.defaultSkin];

		
		this.ctx.clearRect(0,0,this.renderRadius*2,this.renderRadius*2);

		
		if (skin.outerBorder)
			this.fullCircleAt(this.renderRadius,this.renderRadius,skin.outerBorder);

		
		for (var i=0;i<60;i++) {
			(i%5)  && skin.smallIndicator && this.radialLineAtAngle(this.tickAngle(i),skin.smallIndicator);
			!(i%5) && skin.largeIndicator && this.radialLineAtAngle(this.tickAngle(i),skin.largeIndicator);
		}

		
		if (this.showDigital) {
			this.drawTextAt(
				this.timeText(hour,min,sec),
				this.renderRadius,
				this.renderRadius+this.renderRadius/2
			);
		}

		
		if (skin.hourHand)
			this.radialLineAtAngle(this.tickAngle(((hour%12)*5 + min/12.0)),skin.hourHand);

		if (skin.minuteHand)
			this.radialLineAtAngle(this.tickAngle((min + sec/60.0)),skin.minuteHand);

		if (this.showSecondHand && skin.secondHand)
			this.radialLineAtAngle(this.tickAngle(sec),skin.secondHand);

		
		if (!Clock.config.isIE && this.showSecondHand && skin.secondDecoration)
			this.radialLineAtAngle(this.tickAngle(sec),skin.secondDecoration);
	},

	
	refreshDisplay: function() {
		var now = new Date();
		if (this.gmtOffset != null) {
			
			var offsetNow = new Date(now.valueOf() + (this.gmtOffset * 1000 * 60 * 60));
			this.render(offsetNow.getUTCHours(),offsetNow.getUTCMinutes(),offsetNow.getUTCSeconds());
		}
		else {
			
			this.render(now.getHours(),now.getMinutes(),now.getSeconds());
		}
	},

	
	nextTick: function() {
		setTimeout("Clock.config.clockTracker['"+this.canvasId+"'].tick()",this.tickDelay);
	},

	
	stillHere: function() {
		return document.getElementById(this.canvasId) != null;
	},

	
	tick: function() {
		if (this.stillHere()) {
			this.refreshDisplay()
			this.nextTick();
		}
	}
};


Clock.findAndCreateClocks = function() {
	
	var canvases = document.getElementsByTagName("canvas");
	for (var i=0;i<canvases.length;i++) {
		
		var fields = canvases[i].className.split(" ")[0].split(":");
		if (fields[0] == "Clock") {
			if (!canvases[i].id) {
				
				canvases[i].id = '_Clock_auto_id_' + Clock.config.noIdCount++;
			}
			
			new Clock({
				canvasId:       canvases[i].id,
				skinId:         fields[1],
				displayRadius:  fields[2],
				showSecondHand: fields[3]!='noSeconds',
				gmtOffset:      fields[4],
				showDigital:    fields[5]=='showDigital',
				logClock:       fields[6]=='logClock',
				logClockRev:    fields[6]=='logClockRev'
			});
		}
	}
};


if (window.jQuery) jQuery(document).ready(Clock.findAndCreateClocks);

