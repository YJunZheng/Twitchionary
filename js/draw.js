// Initializing everything

var canvas = document.getElementById('canvas'); // Gets the canvas area
var ctx = canvas.getContext("2d"); // Sets context for canvas as 2D
var height = $('#drawing-container').height();
var width = $('#drawing-container').width();
const maxSize = {"x" : 1095, "y" : 616};
const ogHeight = maxSize["y"];
const ogWidth = maxSize["x"];
canvas.height = maxSize["y"];
canvas.width = maxSize["x"]; // Define height and width as whole browser, then set as canvas
ctx.lineCap = "round";
ctx.lineJoin = "round";

var mouse = {x: 0, y: 0}; // Intialize object to store mouse position
var mousePressed; // Boolean that checks if mouse is pressed or not to allow drawing

const strokeWidths = [2, 8, 16, 32];
const colors = {
	"red" : "#FF0000",
	"orange" : "#FFA500",
	"yellow" : "#FFFF00",
	"green" : "#00FF00",
	"blue" : "#0000FF",
	"purple" : "#800080",
	"gray" : "#C0C0C0",
	"black" : "#000000",
	"dark-red" : "#8B0000",
	"dark-orange" : "#8B4513",
	"dark-yellow" : "#BDB76B",
	"dark-green" : "#006400",
	"dark-blue" : "#000080",
	"dark-purple" : "#4B0082",
	"dark-gray" : "#696969",
	"white" : "#ffffff"
};

// set images undraggable

let drawingTools = document.getElementsByClassName("drawing-tool");
for (i = 0; i < drawingTools.length; i++) {
	drawingTools[i].draggable = false;
}

document.getElementById("garbage-tool").draggable = false;

// Initial canvas options

ctx.lineWidth = strokeWidths[1];
var currentTool = 0;
var currentColor = colors["black"];
document.getElementById("size1").style.filter="brightness(0.7)";
document.getElementById("pencil-tool").style.background = currentColor;

// Toolbar

function changeColor(id) {
	currentTool = 0;
	currentColor = colors[id.substring(0, id.indexOf("-button"))];
	ctx.strokeStyle = currentColor;

	let array = document.getElementsByClassName("drawing-tool");
	for (i = 0; i < array.length; i++) {
		array[i].style.background = "white";
	}

	document.getElementById("pencil-tool").style.background = currentColor;
}

function changeStrokeWidth(id) {
	ctx.lineWidth = strokeWidths[id.substring(4, id.length)];

	let array = document.getElementsByClassName("tool-size");
	for (i = 0; i < array.length; i++) {
		array[i].style.filter = "brightness(1)";
	}
	
	document.getElementById(id).style.filter = "brightness(0.7)";
}

function changeTool(id) {
	let array = document.getElementsByClassName("drawing-tool");
	for (i = 0; i < array.length; i++) {
		array[i].style.background = "white";
	}

	document.getElementById(id).style.background = "var(--light-twitch)";

	if (id == "pencil-tool") {
		currentTool = 0;
		ctx.strokeStyle = currentColor;
		document.getElementById("pencil-tool").style.background = currentColor;
	} else if (id == "eraser-tool") {
		currentTool = 1;
		ctx.strokeStyle = colors["white"];
	} else {
		currentTool = 2;
	}
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function canvasMouseOut() {
	mousePressed = false;
}

// Basic canvas drawing

$(window).resize(function() {
	height = $('#drawing-container').height();
	width = $('#drawing-container').width();
})

$('#canvas').mousedown(function start(e) {
	mousePressed = true;
	mouse.x = ogWidth / width * (e.pageX - $('#canvas').offset().left); //Get position of mouse
	mouse.y = ogHeight / height * (e.pageY - $('#canvas').offset().top); //Offset is offset from the parent element, as part of this. 

	ctx.beginPath();
	ctx.lineTo(mouse.x, mouse.y); // Draw a line from where the path last started to where the mouse is
	ctx.stroke(); // Draw a stroke from the two locations
})

$('#canvas').mouseup (()=> {
	mousePressed = false; // Stops drwaing
})

$('#canvas').mousemove(function move(e) {
	if (currentTool != 2) {	// Pencil Tool
		if (mousePressed){
			mouse.x = ogWidth / width * (e.pageX - $('#canvas').offset().left); //Get position of mouse
			mouse.y = ogHeight / height * (e.pageY - $('#canvas').offset().top); //Offset is offset from the parent element, as part of this. 
		
			ctx.lineTo(mouse.x, mouse.y); // Draw a line from where the path last started to where the mouse is
			ctx.stroke(); // Draw a stroke from the two locations
		}
	} else {	// Bucket tool
	}
})

if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
	document.getElementById("colors-container").style.top = "-13px";
	document.getElementById("tools-container").style.paddingTop = "20px";
}