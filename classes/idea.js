class Idea {
  title = null;
  text = "hi";
  prevText = this.text;
  dateCreated = null;
  dateUpdated = null;

  // Display stuff
  r = 20;
  width = 200;
  height = 250;
  bodyColor = "#996633";
  prevBodyColor = this.bodyColor;
  borderThickness = 4;
  prevBorderThickness = this.borderThickness;
  borderColor = "#336699";
  prevBorderColor = this.borderColor;

  constructor(x, y) {
    this.pos = new Vector2D(x, y);
    this.status = "passive";
  }

  // Text area to write in

  // Mood recorder

  // Update function
  update() {
    // console.log(this.status);
    switch (this.status) {
      case "passive":
        this.text = this.prevText;
        this.bodyColor = this.prevBodyColor;
        this.borderColor = this.prevBorderColor;
        this.borderThickness = this.prevBorderThickness;
        break;
      case "hovered":
        // this.text = "!";
        // this.bodyColor = "red";
        this.borderColor = "white";
        this.borderThickness = 10;
        break;
    case "active":
        this.text = ":)";
        this.bodyColor = "green";  
        break; 
      default:
        console.log("else");
        break;
    }
  }

  // Render function
  render(ctx) {
    // Draw rounded rectangle
    ctx.fillStyle = this.bodyColor;
    ctx.lineWidth = this.borderThickness;
    ctx.strokeStyle = this.borderColor;
    ctx.beginPath();
    ctx.moveTo(this.pos.x + this.r, this.pos.y);
    ctx.lineTo(this.pos.x + this.width - this.r, this.pos.y);
    ctx.quadraticCurveTo(
      this.pos.x + this.width,
      this.pos.y,
      this.pos.x + this.width,
      this.pos.y + this.r
    );
    ctx.lineTo(this.pos.x + this.width, this.pos.y + this.height - this.r);
    ctx.quadraticCurveTo(
      this.pos.x + this.width,
      this.pos.y + this.height,
      this.pos.x + this.width - this.r,
      this.pos.y + this.height
    );
    ctx.lineTo(this.pos.x + this.r, this.pos.y + this.height);
    ctx.quadraticCurveTo(
      this.pos.x,
      this.pos.y + this.height,
      this.pos.x,
      this.pos.y + this.height - this.r
    );
    ctx.lineTo(this.pos.x, this.pos.y + this.r);
    ctx.quadraticCurveTo(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.r,
      this.pos.y
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw text
    ctx.font = "100px Arial";
    ctx.fillStyle = "white";
    // ctx.textAlign = "center";
    // ctx.textBaseline = "middle";
    ctx.fillText(
      this.text,
      this.pos.x + this.width / 2,
      this.pos.y + this.height / 2
    );
  }
}
