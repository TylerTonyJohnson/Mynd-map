"use strict";
let canvas;
let ctx;

window.onload = setup;
let ideas = [];
let shapes = [];
let anchor = {};

let circleNum = 26;

let secondsPassed = 0;
let oldTimeStamp = 0;
let offsetX = 0;
let offsetY = 0;

function setup() {
  canvas = $("canvas");
  ctx = canvas.getContext("2d");

  // Size canvas
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  let boundingBox = canvas.getBoundingClientRect();
  offsetX = boundingBox.left;
  offsetY = boundingBox.top;

  // Canvas events
  canvas.onmousedown = mouseDown;
  canvas.onmouseup = mouseUp;
  canvas.onmousemove = mouseMove;

  // Generate anchor
  anchor.x = canvas.width / 2;
  anchor.y = canvas.height / 2;

  // Generate shapes
  for (let i = 0; i < circleNum; i++) {
    let newCircle = new Circle(
      Math.random() * canvas.width,
      (Math.random() * canvas.height) / 2
    );
    newCircle.vel = new Vector2D(Math.random() * 1000, Math.random() * 1000);
    newCircle.bodyColor =
      "#" +
      Math.floor(Math.random() * 16777216)
        .toString(16)
        .padStart(6, "0");
    newCircle.text = getLetter(circleNum - i - 1);
    shapes.push(newCircle);
  }

  let newIdea = new Idea(canvas.width / 3, canvas.height / 3);
  ideas.push(newIdea);

  window.requestAnimationFrame(frameLoop);
}

function frameLoop(timeStamp) {
  // Calculate how much time has passed
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  // Pass the time to the update
  shapes.forEach((shape) => {
    shape.update(secondsPassed);
  });

  ideas.forEach((idea) => {idea.update();})

  // Call draw function
  draw();

  // The loop has reached its end. Keep requesting frames
  window.requestAnimationFrame(frameLoop);
}

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  ctx.fillStyle = "rgb(50, 50, 50)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw circles
  shapes.forEach((shape) => {
    shape.draw(ctx);
  });

  // Draw anchor
  ctx.beginPath();
  ctx.arc(anchor.x, anchor.y, 10, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.strokeStyle = "#999999";
  ctx.stroke();

  // Draw ideas
  ideas.forEach((idea) => {
    idea.render(ctx);
  });
}

function mouseDown(e) {
  console.log("mouse down");
  e.preventDefault();
  e.stopPropagation();
}

function mouseUp(e) {
  console.log("mouse up");
}

function mouseMove(e) {
  // console.log("mouse move");

  e.preventDefault();
  e.stopPropagation();

  // Get current mouse position
  let mouseX = parseInt(e.clientX - offsetX);
  let mouseY = parseInt(e.clientY - offsetY);

  // console.log(mouseX, mouseY)

  // Test for first object that overlaps with mouse
  for (let i = ideas.length-1; i >= 0; i--) {
    let thisIdea = ideas[i];
    if (mouseX > thisIdea.pos.x && mouseX < thisIdea.pos.x + thisIdea.width && mouseY > thisIdea.pos.y && mouseY < thisIdea.pos.y + thisIdea.height) {
      thisIdea.isHovered = true;
    } else {
      thisIdea.isHovered = false;
    }



    // // Circle test
    // let dx = thisShape.x - mouseX;
    // let dy = thisShape.y - mouseY;

    // if (dx*dx+dy*dy<thisShape.r*thisShape.r) {
    //   console.log(thisShape.text);
    //   thisShape.text = "!";
    // }
  }


}
