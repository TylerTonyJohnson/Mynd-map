class Circle {
  r = 30;
  hasConnector = true;

  // Constructor
  constructor(x, y) {
    this.pos = new Vector2D(x, y);
    this.vel = new Vector2D(100, 100);
    this.acc = new Vector2D(0, 1000);
    // this.x = x;
    // this.y = y;
  }

  // Update function
  update(secondsPassed) {

    // Update velocity
    this.vel = this.vel.add(this.acc.multiply(secondsPassed));

    // Update position
    this.pos = this.pos.add(this.vel.multiply(secondsPassed));

    // Horizontal boundary check
    if (this.pos.x < 0 + this.r) {
      this.pos.x = 0 + this.r;
      this.vel.x *= -1 * 0.9;
    } else if (this.pos.x > canvas.width - this.r) {
      this.pos.x = canvas.width - this.r;
      this.vel.x *= -1 * 0.9;
    }

    // Vertical boundary check
    if (this.pos.y < 0 + this.r) {
      this.pos.y = 0 + this.r;
      this.vel.y *= -1 * 0.9;
    } else if (this.pos.y > canvas.width - this.r) {
      this.pos.y = canvas.width - this.r;
      this.vel.y *= -1 * 0.9;
    }
  }

  // Draw function
  draw(ctx) {
    // Connecting line
    if (this.hasConnector) {
      if (anchor) {
        ctx.beginPath();
        ctx.moveTo(anchor.x, anchor.y);
        ctx.strokeStyle = "#999999";
        ctx.lineTo(this.pos.x, this.pos.y);
        ctx.stroke();
        ctx.closePath();
      } else {
        this.hasConnector = false;
      }
    }

    // Circle body
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = "#08aaff";
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#999999";
    ctx.stroke();
    ctx.closePath();
  }
}
