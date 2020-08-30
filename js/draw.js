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
clearCanvas();

//Hold current RGB values for paint bucket tool
currentRGB = {
	r: 0, 
	g: 0,
	b:0
}


for (i = 1; i < 17; i++) {
	colors["color" + i.toString()] = getComputedStyle(document.getElementsByTagName("BODY")[0]).getPropertyValue("--color" + i.toString());
}

//Hex-to-RGB converter

function hex(currentColorString) {
	var Rstring = currentColorString.slice(2, 4)
	var Gstring = currentColorString.slice(4, 6)
	var Bstring = currentColorString.slice(6, 8)
	
	var R = Number.parseInt(Rstring, 16)
	var G = Number.parseInt(Gstring, 16)
	var B = Number.parseInt(Bstring, 16)

	return ({
		r: R,
		g: G,
		b: B
	})
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
	currentRGB = hex(currentColor)
	console.log(currentRGB)

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
	ctx.fillStyle = colors["white"];
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function canvasMouseOut() {
	mousePressed = false;
}

// Bucket Tool implementation inspired by http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/

//Gets the current pixel position in img data, every 4 entries in img data represents one pixel, with 4 entries corresponding to R, G, B and Alpha
function getPixelPos(x,y) {
	return (y * canvas.width + x) * 4
}

//Checks to see if the given pixel matches the colour of the starting pixel
function matchStartColor(data, pos, startColor) {
	return (
		data[pos] === startColor.r &&
		data[pos+1] === startColor.g &&
		data[pos+2] === startColor.b &&
		data[pos+3] === startColor.a
	)
}

//Changes colour of the pixel
function colorPixel(data, pos, color) {
	data[pos] = color.r || 0
	data[pos+1] = color.g || 0
	data[pos+2] = color.b || 0
	data[pos+3] = color.hasOwnProperty("a") ? color.a : 255
}

//Performs the fill function
function fill(startX, startY, fillColor) {
	var img = ctx.getImageData(0, 0, canvas.width, canvas.height) //Get canvas as imgdata object

	var startPos = getPixelPos(startX, startY) //Get starting position
	var startColor = { //Get starting colour
		r: img.data[startPos],
		g: img.data[startPos+1],
		b: img.data[startPos+2],
		a: img.data[startPos+3]
	}
	//Prevents out-of-memory crash due to infinite loop by aborting if the fill colour is same as start colour.
	//This implementation has to be used because fillColor has no alpha value
	if (startColor.r==fillColor.r && startColor.g==fillColor.g && startColor.b==fillColor.b)
	{
		return
	}

	//Pixel Stack holds the pixel columns that need to be worked on
	var pixelStack = [[startX, startY]]

	//Scans through column in pixel stack and colours in
	while(pixelStack.length > 0) {
		var currPos = pixelStack.pop()
		var x = currPos[0]
		var y = currPos[1]
		var currPixPos = getPixelPos(x, y)

		//Pointer scans upwards from current position until a different colour is reached
		while (y-- >= 0 && matchStartColor(img.data, currPixPos, startColor)) 
		{
			currPixPos -= canvas.width * 4
		}

		//Move pointer down by one to get back into canvas region
		currPixPos += canvas.width * 4
		++y
		var reachLeft = false //Reachleft and Reachright adds the left or right to the pixelStack if the colour matches startcolour
		var reachRight = false

		//Move downwards while colouring pixels with fill colour, check if left or right is open
		while(y++ < canvas.height-1 && matchStartColor(img.data, currPixPos, startColor))
		{
			colorPixel(img.data, currPixPos, fillColor)
		
		//If there is space to the left, check if the colour of the pixel on left matches the startColour, if so, add to pixelStack
		if (x>0) {
			if (matchStartColor(img.data, currPixPos-4, startColor) && !reachLeft) 
			{
				pixelStack.push([x-1, y])
				reachLeft=true
			}

			else if(reachLeft) {
				reachLeft=false
			}
		}

		//Vice-versa for right
		if (x < canvas.width-1) {
			if (matchStartColor(img.data, currPixPos+4, startColor) && !reachLeft) {
				pixelStack.push([x+1, y])
				reachRight=true
			}
			else if (reachRight) {
				reachRight=false
			}
		}
		//Move to next pixel
		currPixPos+= canvas.width * 4
	}
	}
	//Update canvas with new image data
	ctx.putImageData(img, 0, 0)

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

	if (currentTool != 2) {
		ctx.beginPath();
		ctx.lineTo(mouse.x, mouse.y); // Draw a line from where the path last started to where the mouse is
		ctx.stroke(); // Draw a stroke from the two locations
	} 

	if (currentTool==2) {
		//Start X and Y values have to be truncated to avoid an infinite loop
		x = Math.trunc(mouse.x)
		y = Math.trunc(mouse.y)
		fill(x, y , currentRGB)
	}
})

$('#canvas').mouseup (()=> {
	if (currentTool==1) {
		ctx.closePath()
	}
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