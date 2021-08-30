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
  width = 200;
  height = 250;
  bodyColor = "#996633";
  defBodyColor = this.bodyColor;
  borderThickness = 4;
  defBorderThickness = this.borderThickness;
  borderColor = "#336699";
  defBorderColor = this.borderColor;
  
  // Runtime
  isDebug = false;
  isActive = false;
  isClicking = false;
  isDragging = false;
  isHovering = false;
  
  constructor(x, y) {
    this.pos = new Vector2D(x, y);
    this.status = "passive";
    this.defBodyColor = "#" + Math.floor(Math.random() * 16777216).toString(16).padStart(6, "0");
  }

  // Text area to write in

  // Mood recorder

  // Update function
  update() {
    
    // Get status / coloring



    switch (this.status) {
      case "passive":
        this.text = this.defText;
        this.bodyColor = this.defBodyColor;
        this.borderColor = this.defBorderColor;
        this.borderThickness = this.defBorderThickness;
        break;
      case "hovered":
        // this.text = "!";
        // this.bodyColor = "red";
        this.borderColor = "white";
        this.borderThickness = 10;
        break;
    case "active":
        // this.text = ":)";
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
    ctx.moveTo(this.pos.x - this.width / 2 + this.r / 2, this.pos.y - this.height / 2);
    ctx.lineTo(this.pos.x - this.width / 2 + this.width - this.r, this.pos.y - this.height / 2);
    ctx.quadraticCurveTo(
      this.pos.x - this.width / 2 + this.width,
      this.pos.y - this.height / 2,
      this.pos.x - this.width / 2 + this.width,
      this.pos.y - this.height / 2 + this.r
    );
    ctx.lineTo(this.pos.x - this.width / 2 + this.width, this.pos.y - this.height / 2 + this.height - this.r);
    ctx.quadraticCurveTo(
      this.pos.x - this.width / 2 + this.width,
      this.pos.y - this.height / 2 + this.height,
      this.pos.x - this.width / 2 + this.width - this.r,
      this.pos.y - this.height / 2 + this.height
    );
    ctx.lineTo(this.pos.x - this.width / 2 + this.r, this.pos.y - this.height / 2 + this.height);
    ctx.quadraticCurveTo(
      this.pos.x - this.width / 2,
      this.pos.y - this.height / 2 + this.height,
      this.pos.x - this.width / 2,
      this.pos.y - this.height / 2 + this.height - this.r
    );
    ctx.lineTo(this.pos.x - this.width / 2, this.pos.y - this.height / 2 + this.r);
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
    ctx.fillText(
      this.text,
      this.pos.x - this.width / 2 + this.width / 2,
      this.pos.y - this.height / 2 + this.height / 2
    );
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;

    // Debug centering dot
    if ( this.isDebug ) {
      ctx.fillStyle = "red";
      ctx.fillRect(this.pos.x-4, this.pos.y-4, 9, 9);
    }
  }
}
