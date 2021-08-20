let canvas;
let context;

window.onload = setup;
let shapes = [];
let anchor = {};
// let newCircle;

function setup() {
  canvas = $("canvas");
  context = canvas.getContext("2d");

  anchor.x = canvas.width / 2;
  anchor.y = canvas.height / 2;

  // console.log(context);
  shapes.push(new Circle(context, canvas.width / 5, canvas.height / 5));
  window.requestAnimationFrame(frameLoop);
}

let secondsPassed = 0;
let oldTimeStamp = 0;

function frameLoop(timeStamp) {
  // Calculate how much time has passed
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  // Pass the time to the update
  shapes.forEach((shape) => {
    shape.update(secondsPassed);
  });

  // Call draw function
  draw();

  // The loop has reached its end. Keep requesting frames
  window.requestAnimationFrame(frameLoop);
}

function draw() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  context.fillStyle = "rgb(50, 50, 50)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw circles
  shapes.forEach((shape) => {
    shape.draw();
  });

    // Draw anchor
    context.beginPath();
    context.arc(anchor.x, anchor.y, 10, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = "#FFFFFF";
    context.fill();
    context.strokeStyle = "#999999";
    context.stroke();
}