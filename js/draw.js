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

const strokeWidths = [1, 8, 16, 32];
var strokeIndex = 1;
var colors = {"black" : "#000000", "white" : "#FFFFFF"};

for (i = 1; i < 17; i++) {
	colors["color" + i.toString()] = getComputedStyle(document.getElementsByTagName("BODY")[0]).getPropertyValue("--color" + i.toString());
}

// set images undraggable

let drawingTools = document.getElementsByClassName("drawing-tool");
for (i = 0; i < drawingTools.length; i++) {
	drawingTools[i].draggable = false;
}

document.getElementById("garbage-tool").draggable = false;

// Initial canvas options

document.getElementById("canvas").style.cursor = `url("assets/cursors/size`
	+ strokeIndex + `.cur"), default`;
document.getElementById("canvas").setAttribute("onmouseout", "canvasMouseOut()")

ctx.lineWidth = strokeWidths[strokeIndex];
var currentTool = 0;	// 0 = pencil, 1 = eraser, 2 = bucket
var currentColor = colors["black"];
document.getElementById("size1").style.filter="brightness(0.7)";
document.getElementById("pencil-tool").style.background = currentColor;

// Toolbar

function changeColor(id) {
	currentColor = colors[id.substring(0, id.indexOf("-button"))];
	ctx.strokeStyle = currentColor;
	ctx.fillStyle = currentColor;

	let array = document.getElementsByClassName("drawing-tool");
	for (i = 0; i < array.length; i++) {
		array[i].style.background = "white";
	}

	if (currentTool != 2) {
		document.getElementById("pencil-tool").style.background = currentColor;
	} else {
		document.getElementById("bucket-tool").style.background = currentColor;
	}
}

function changeStrokeWidth(id) {
	strokeIndex = id.substring(4, id.length);
	ctx.lineWidth = strokeWidths[strokeIndex];

	if (currentTool !== 2) {
		document.getElementById("canvas").style.cursor = `url("assets/cursors/size`
			+ strokeIndex + `.cur"), default`;
	}

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
		document.getElementById("canvas").style.cursor = `url("assets/cursors/size`
			+ strokeIndex + `.cur"), default`;		
		currentTool = 0;
		ctx.strokeStyle = currentColor;
		document.getElementById("pencil-tool").style.background = currentColor;
	} else if (id == "eraser-tool") {
		document.getElementById("canvas").style.cursor = `url("assets/cursors/size`
			+ strokeIndex + `.cur"), default`;
		currentTool = 1;
		ctx.strokeStyle = colors["white"];
	} else {
		document.getElementById("canvas").style.cursor = `url("assets/cursors/bucket.cur"), default`;
		currentTool = 2;
		document.getElementById("bucket-tool").style.background = currentColor;
	}
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function canvasMouseOut() {
	mousePressed = false;
}

// Bucket Tool (http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/)


// Basic canvas drawing

$(window).resize(function() {
	height = $('#drawing-container').height();
	width = $('#drawing-container').width();
})

$('#canvas').mousedown(function start(e) {
	mousePressed = true;
	mouse.x = ogWidth / width * (e.pageX - $('#canvas').offset().left); //Get position of mouse
	mouse.y = ogHeight / height * (e.pageY - $('#canvas').offset().top); //Offset is offset from the parent element, as part of this. 

	if (currentTool != 2) {
		ctx.beginPath();
		ctx.lineTo(mouse.x, mouse.y); // Draw a line from where the path last started to where the mouse is
		ctx.stroke(); // Draw a stroke from the two locations
	} else {
		floodFill(canvas, mouse.x, mouse.y, currentColor, 80);
	}
})

$('#canvas').mouseup (()=> {
	mousePressed = false; // Stops drwaing
})

$('#canvas').mousemove(function move(e) {
	if (currentTool != 2) {	// if not paint bucket (weird things start happening if you dont put this check)
		if (mousePressed){
			mouse.x = ogWidth / width * (e.pageX - $('#canvas').offset().left); //Get position of mouse
			mouse.y = ogHeight / height * (e.pageY - $('#canvas').offset().top); //Offset is offset from the parent element, as part of this. 
			ctx.lineTo(mouse.x, mouse.y); // Draw a line from where the path last started to where the mouse is
			ctx.stroke(); // Draw a stroke from the two locations
		}
	}
})