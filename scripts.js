let canvas;
let ctx;

window.onload = setup;
let ideas = [];
let shapes = [];
let anchor = {};

function setup() {
  canvas = $("canvas");
  ctx = canvas.getContext("2d");

  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  anchor.x = canvas.width / 2;
  anchor.y = canvas.height / 2;

  // Generate shapes
  for (let i = 0; i < 5; i++) {
    let newCircle = new Circle(Math.random()*canvas.width, Math.random()*canvas.height/2);
    newCircle.vel = new Vector2D(Math.random() * 1000, Math.random() * 1000);

    shapes.push(newCircle);
  }

  let newIdea = new Idea(canvas.width/3, canvas.height/3);
  ideas.push(newIdea);

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
