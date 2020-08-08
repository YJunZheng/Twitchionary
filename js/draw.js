var canvas = document.getElementById('canvas'); //Gets the canvas area
var ctx = canvas.getContext("2d"); //Sets context for canvas as 2D
var height = $('#drawing-container').height();
var width = $('#drawing-container').width();
canvas.height = parseInt(height);
canvas.width = parseInt(width); //Define height and width as whole browser, then set as canvas

var mouse = {x: 0, y: 0}; //Intialize object to store mouse position
var mousePressed; //Boolean that checks if mouse is pressed or not to allow drawing

const strokeWidths = [2, 8, 16, 32];
const colors = {
	"red" : "FF0000",
	"orange" : "FFA500",
	"yellow" : "FFFF00",
	"green" : "00FF00",
	"blue" : "0000FF",
	"purple" : "800080",
	"gray" : "C0C0C0",
	"black" : "000000",
	"dark-red" : "8B0000",
	"dark-orange" : "8B4513",
	"dark-yellow" : "BDB76B",
	"dark-green" : "006400",
	"dark-blue" : "000080",
	"dark-purple" : "4B0082",
	"dark-gray" : "696969",
	"white" : "ffffff"
};

$(window).resize(function() {

	var oldCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height);

	var height = $('#drawing-container').height();
	var width = $('#drawing-container').width();
	canvas.height = parseInt(height);
	canvas.width = parseInt(width); 
	
	ctx.putImageData(oldCanvas,0,0);
})

$('#canvas').mousedown (()=> {
	mousePressed = true;
	ctx.beginPath(); //If mouse is presssed, starts a path at that location
})

$('#canvas').mouseup (()=> {
	mousePressed =false; //Stops drwaing
})

$('#canvas').mousemove(function move(e) {
	if (mousePressed){
		mouse.x = e.pageX - $('#canvas').offset().left; //Get position of mouse
		mouse.y = e.pageY - $('#canvas').offset().top; //Offset is offset from the parent element, as part of this. 
	
		ctx.lineTo(mouse.x, mouse.y); //Draw a line from where the path last started to where the mouse is
		ctx.stroke(); //Draw a stroke from the two locations
	}
})