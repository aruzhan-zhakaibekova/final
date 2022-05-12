var ham = document.querySelector('.hamburger-container'); //hamburger menu for mobile setting things up
var	pageBody = document.querySelector('.page');
var menu = document.querySelector('.menu');
    ham.onclick = function () { //hamburger menu for mobile: rotate the menu and page, show links in menu, change page z-index to make link clickable
		if (ham.classList.contains('open')) {
			pageBody.classList.remove('open');
			ham.classList.remove('open');
      menu.style.display = "none";
		} else {
			pageBody.classList.add('open');
      pageBody.style.zIndex = "-1";
			ham.classList.add('open');
      menu.style.display = "block";
		}
	};

var container = document.getElementById("container"); //baursak toggle, show container with p5.js animation on toggle
var btn = document.querySelector('#baursak')
btn.onclick = function () {
  if (container.style.display === "block") {
      container.style.display = "none";
    } else {
      container.style.display = "block";
    }
};


//p5.js animation, emulated from https://p5js.org/examples/simulate-soft-body.html
let centerX = 0.0, centerY = 0.0;

let radius = 50, rotAngle = -90;
let accelX = 0.0, accelY = 0.0;
let deltaX = 0.0, deltaY = 0.0;
let springing = 0.0009, damping = 0.98;

//corner nodes
let nodes = 4;

//zero fill arrays
let nodeStartX = [];
let nodeStartY = [];
let nodeX = [];
let nodeY = [];
let angle = [];
let frequency = [];

// soft-body dynamics
let organicConstant = 1.0;

function setup() {
  var canvas =   createCanvas(windowWidth, windowHeight); //anchor the canvas on the container needed, make full screen
  canvas.parent('container');
  background(255, 0, 200);

  //center shape in window
  centerX = width / 2;
  centerY = height / 2;

  //initialize arrays to 0
  for (let i = 0; i < nodes; i++){
    nodeStartX[i] = 0;
    nodeStartY[i] = 0;
    nodeY[i] = 0;
    nodeY[i] = 0;
    angle[i] = 0;
  }

  // iniitalize frequencies for corner nodes
    for (let i = 0; i < nodes; i++){
      frequency[i] = random(5, 12);
    }

    noStroke();
    frameRate(30);
  }


  function windowResized() { //if the window is resized
  resizeCanvas(windowWidth, windowHeight);
}

  function draw() {
     clear(); //make canvas transparent
    //fade background
    fill(0, 100);
    rect(0, 0, width, height);
    drawShape();
    moveShape();
  }

  function drawShape() {
    //  calculate node  starting locations
    for (let i = 0; i < nodes; i++){
      nodeStartX[i] = centerX + cos(radians(rotAngle)) * radius;
      nodeStartY[i] = centerY + sin(radians(rotAngle)) * radius;
      rotAngle += 360.0 / nodes;
    }

    // draw polygon
  curveTightness(organicConstant);
  fill(237, 156, 50);
  beginShape();
  for (let i = 0; i < nodes; i++){
    curveVertex(nodeX[i], nodeY[i]);
  }
  for (let i = 0; i < nodes-1; i++){
    curveVertex(nodeX[i], nodeY[i]);
  }
  endShape(CLOSE);
}

function moveShape() {
  //move center point
  deltaX = mouseX - centerX;
  deltaY = mouseY - centerY;

  // create springing effect
  deltaX *= springing;
  deltaY *= springing;
  accelX += deltaX;
  accelY += deltaY;

  // move predator's center
  centerX += accelX;
  centerY += accelY;

  // slow down springing
  accelX *= damping;
  accelY *= damping;

  // change curve tightness
  organicConstant = 1 - ((abs(accelX) + abs(accelY)) * 0.1);
  //move nodes
 for (let i = 0; i < nodes; i++){
   nodeX[i] = nodeStartX[i] + sin(radians(angle[i])) * (accelX * 2);
   nodeY[i] = nodeStartY[i] + sin(radians(angle[i])) * (accelY * 2);
   angle[i] += frequency[i];
 }
}
