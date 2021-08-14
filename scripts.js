let canvas;
let context;

window.onload = setup;

let newCircle;

function setup() {
  canvas = $("canvas");
  context = canvas.getContext("2d");
  console.log(context);
  newCircle = new Circle(context, canvas.width / 3, canvas.height / 3);

  window.requestAnimationFrame(frameLoop);
}

let secondsPassed = 0;
let oldTimeStamp = 0;
let movingSpeed = 50;

function frameLoop(timeStamp) {
  // Calculate how much time has passed
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  // Pass the time to the update
  // update(secondsPassed);
  draw();

  // The loop has reached its end. Keep requesting frames
  window.requestAnimationFrame(frameLoop);
}

function draw() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  newCircle.draw();
}

function update(secondsPassed) {
  // Use time to calculate new position
  x += movingSpeed * secondsPassed;
  y += movingSpeed * Math.sin(secondsPassed);
}
