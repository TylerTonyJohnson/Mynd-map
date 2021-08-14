class Circle {
  x = 0;
  y = 0;
  r = 30;
  xSpeed = 0.1;
  ySpeed = 0.1;

  // Constructor
  constructor(context, x, y) {
    this.x = x;
    this.y = y;
    this.context = context;
  }

  // Update function
  update() {

  }

  // Draw function
  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.context.fillStyle = "#08aaff";
    this.context.fill();
  }
}
