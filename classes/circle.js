class Circle {
  x = 0;
  y = 0;
  r = 30;
  xSpeed = 100;
  ySpeed = 0;

  force = 0;

  hasConnector = true;

  // Constructor
  constructor(context, x, y) {
    this.x = x;
    this.y = y;
    this.context = context;
  }

  // Update function
  update(secondsPassed) {
    console.log("Updating circle");

    // Horizontal boundary check
    if (this.x < 0 + this.r) {
      this.x = 0 + this.r;
      this.xSpeed = Math.abs(this.xSpeed);
    } else if (this.x > canvas.width - this.r) {
      this.x = canvas.width - this.r;
      this.xSpeed = Math.abs(this.xSpeed) * -1;
    }

    // Vertical boundary check
    if (this.y < 0 + this.r) {
      this.y = 0 + this.r;
      this.ySpeed = Math.abs(this.ySpeed);
    } else if (this.y > canvas.width - this.r) {
      this.y = canvas.width - this.r;
      this.ySpeed = Math.abs(this.ySpeed) * -1;
    }

    // Update speed
    this.ySpeed += this.force * secondsPassed;

    // Update position
    this.x += this.xSpeed * secondsPassed;
    this.y += this.ySpeed * secondsPassed;
  }

  // Draw function
  draw() {
    // Connecting line
    if (this.hasConnector) {
      if (anchor) {
        this.context.beginPath();
        this.context.moveTo(anchor.x, anchor.y);
        this.context.strokeStyle = "#999999";
        this.context.lineTo(this.x, this.y);
        this.context.stroke();
        this.context.closePath();
      } else {
        this.hasConnector = false;
      }
    }

    // Circle body
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.context.fillStyle = "#08aaff";
    this.context.fill();
    this.context.lineWidth = 4;
    this.context.strokeStyle = "#999999";
    this.context.stroke();
    this.context.closePath();
  }
}
