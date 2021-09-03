class Idea {
  // Logistic stuff
  id = null;
  title = null;
  text = getRandomLetter() + getRandomLetter();
  defText = this.text;
  dateCreated = null;
  dateUpdated = null;

  // Display stuff
  r = 20;
  width = 160;
  height = 200;
  
  // Body color
  bodyColor = "purple";
  bodyColorDefault = "gray";
  bodyColorActive = "green";

  // Border width
  borderWidth = 20;
  borderWidthDefault = 4;
  borderWidthHovered = 8;

  // Border color
  borderColor = "purple";
  borderColorDefault = "gray";
  borderColorHovered = "white";

  // Runtime
  isDebug = false;
  isActive = false;
  isClicking = false;
  isDragging = false;
  isHovered = false;
  dragOffsetX = 0;
  dragOffsetY = 0;

  constructor(x, y) {
    this.pos = new Vector2D(x, y);
    this.bodyColorDefault =
      "#" +
      Math.floor(Math.random() * 16777216)
        .toString(16)
        .padStart(6, "0");
  }

  // Text area to write in

  // Mood recorder

  // Update function
  update() {

    // Get status / coloring
    this.borderColor = (this.isHovered ? this.borderColorHovered : this.borderColorDefault);
    this.borderWidth = (this.isHovered ? this.borderWidthHovered : this.borderWidthDefault);
    this.bodyColor = (this.isActive ? this.bodyColorActive : this.bodyColorDefault);
  }

  drag(e) {
    this.pos.x = e.clientX - this.dragOffsetX;
    this.pos.y = e.clientY - this.dragOffsetY;
  }

  // Render function
  render(ctx) {

    // Save previous context state
    ctx.save();

    // Draw rounded rectangle
    ctx.fillStyle = this.bodyColor;
    ctx.lineWidth = this.borderWidth;
    ctx.strokeStyle = this.borderColor;
    ctx.lineJoin = "";
    ctx.beginPath();
    ctx.moveTo(
      this.pos.x,
      this.pos.y - this.height / 2
    );
    ctx.lineTo(
      this.pos.x - this.width / 2 + this.width - this.r,
      this.pos.y - this.height / 2
    );
    ctx.quadraticCurveTo(
      this.pos.x - this.width / 2 + this.width,
      this.pos.y - this.height / 2,
      this.pos.x - this.width / 2 + this.width,
      this.pos.y - this.height / 2 + this.r
    );
    ctx.lineTo(
      this.pos.x - this.width / 2 + this.width,
      this.pos.y - this.height / 2 + this.height - this.r
    );
    ctx.quadraticCurveTo(
      this.pos.x - this.width / 2 + this.width,
      this.pos.y - this.height / 2 + this.height,
      this.pos.x - this.width / 2 + this.width - this.r,
      this.pos.y - this.height / 2 + this.height
    );
    ctx.lineTo(
      this.pos.x - this.width / 2 + this.r,
      this.pos.y - this.height / 2 + this.height
    );
    ctx.quadraticCurveTo(
      this.pos.x - this.width / 2,
      this.pos.y - this.height / 2 + this.height,
      this.pos.x - this.width / 2,
      this.pos.y - this.height / 2 + this.height - this.r
    );
    ctx.lineTo(
      this.pos.x - this.width / 2,
      this.pos.y - this.height / 2 + this.r
    );
    ctx.quadraticCurveTo(
      this.pos.x - this.width / 2,
      this.pos.y - this.height / 2,
      this.pos.x - this.width / 2 + this.r,
      this.pos.y - this.height / 2
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    

    // Draw text
    ctx.font = "100px Arial";
    ctx.fillStyle = "white";
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 4;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      this.text,
      this.pos.x - this.width / 2 + this.width / 2,
      this.pos.y - this.height / 2 + this.height / 2
    );
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;

    // Debug centering dot
    if (this.isDebug) {
      ctx.fillStyle = "red";
      ctx.fillRect(this.pos.x - 4, this.pos.y - 4, 9, 9);
    }

    // Restore context to previous state
    ctx.restore();
  }

  startDrag(e) {
    this.dragOffsetX = e.clientX - this.pos.x;
    this.dragOffsetY = e.clientY - this.pos.y;
    this.isDragging = true;
  }

  stopDrag() {
    this.isDragging = false;
  }
}
