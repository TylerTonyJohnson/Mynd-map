class Body {

  // path = null;
  isDebug = false;
  constructor(x = 0, y = 0, r = 10, width = 100, height = 100) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.width = width;
    this.height = height;
    this.color = "white";
    this.borderColor = "white";
    this.borderThickness = 10;
  }

  updateColor = (color = "white", borderColor = "white") => {
    this.color = color;
    this.borderColor = borderColor;
  }

  updateBorder = (borderThickness) => {
    this.borderThickness = borderThickness;
  }

  update = (x, y) => {
    this.x = x;
    this.y = y;
  }

  render = (ctx) => {

    // Set preferences
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.lineWidth = this.borderThickness;
    ctx.strokeStyle = this.borderColor;

    // Draw rounded rectangle
    this.path = new Path2D();  // Need to figure out how to use this.
    this.path.moveTo(this.x, this.y - this.height / 2);
    this.path.lineTo(
      this.x - this.width / 2 + this.width - this.r,
      this.y - this.height / 2
    );
    this.path.quadraticCurveTo(
      this.x - this.width / 2 + this.width,
      this.y - this.height / 2,
      this.x - this.width / 2 + this.width,
      this.y - this.height / 2 + this.r
    );
    this.path.lineTo(
      this.x - this.width / 2 + this.width,
      this.y - this.height / 2 + this.height - this.r
    );
    this.path.quadraticCurveTo(
      this.x - this.width / 2 + this.width,
      this.y - this.height / 2 + this.height,
      this.x - this.width / 2 + this.width - this.r,
      this.y - this.height / 2 + this.height
    );
    this.path.lineTo(
      this.x - this.width / 2 + this.r,
      this.y - this.height / 2 + this.height
    );
    this.path.quadraticCurveTo(
      this.x - this.width / 2,
      this.y - this.height / 2 + this.height,
      this.x - this.width / 2,
      this.y - this.height / 2 + this.height - this.r
    );
    this.path.lineTo(
      this.x - this.width / 2,
      this.y - this.height / 2 + this.r
    );
    this.path.quadraticCurveTo(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.x - this.width / 2 + this.r,
      this.y - this.height / 2
    );
    this.path.closePath();

    // Apply path to context
    ctx.fill(this.path);
    ctx.stroke(this.path);
    ctx.restore();

    // Draw debug stuff if it's in debug mode
    if (this.isDebug) {
      ctx.save();
      // Draw center dot in red
      ctx.fillStyle = "red";
      ctx.fillRect(this.x - 4, this.y - 4, 9, 9);

      // Draw bounding box in red
      ctx.strokeStyle = "red";
      ctx.strokeRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
      ctx.restore();
    }

  }
}