class Idea {
  // Logistic stuff
  id = null;
  title = null;
  text = null;
  defText = this.text;
  dateCreated = null;
  dateUpdated = null;
  contents = [];

  // Display stuff
  r = 20;
  width = 200;
  height = 200;
  textMargin = 10;
  titleHeight = 24;
  lineHeight = 16;
  lineSpacing = 9;

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

  // Title color
  titleColor = "white";

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
    this.title = lorem(1);
    this.text = lorem(Math.floor(Math.random() * 10 + 6));
    this.contents.push(this.title);
    this.contents.push(this.text);

    // Generate body
    this.body = new Body(this.pos.x, this.pos.y, this.r, this.width, this.height);
    this.body.isDebug = this.isDebug;
    this.body.updateColor(this.bodyColorDefault, this.borderColorDefault);
    this.body.updateBorder(this.borderWidthDefault);
    this.contents.push(this.body);
  }

  // Update function
  update() {
    // Get status / coloring
    this.borderColor = this.isHovered
      ? this.borderColorHovered
      : this.borderColorDefault;
    this.borderWidth = this.isHovered
      ? this.borderWidthHovered
      : this.borderWidthDefault;
    this.bodyColor = this.isActive
      ? this.bodyColorActive
      : this.bodyColorDefault;

    // Update children
    this.body.update(this.pos.x, this.pos.y);
  }

  drag(e) {
    if (e.touches) {
      this.pos.x = e.touches[0].clientX - this.dragOffsetX;
      this.pos.y = e.touches[0].clientY - this.dragOffsetY;
    } else {
      this.pos.x = e.clientX - this.dragOffsetX;
      this.pos.y = e.clientY - this.dragOffsetY;
    }
  }

  // Render function
  render = (ctx) => {

    // Render body
    this.body.render(ctx);

    // Render title
    ctx.save();
    ctx.fillStyle = this.titleColor;
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 4;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    let titleY =
      this.pos.y - this.height / 2 + this.titleHeight / 2 + this.textMargin;
    ctx.font = `${this.titleHeight}px Trebuchet MS`;
    ctx.fillText(this.title, this.pos.x, titleY);
    ctx.restore();

    // Render text
    ctx.font = `${this.lineHeight}px Arial`;
    ctx.textAlign = "left";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;

    // Multi-line support
    let words = this.text.split(" ");
    let lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      let word = words[i];
      let wordWidth = ctx.measureText(currentLine + " " + word).width;
      if (wordWidth < this.width - this.textMargin * 2) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(
        lines[i],
        this.pos.x - this.width / 2 + this.textMargin,
        titleY +
          this.lineSpacing +
          this.lineHeight +
          i * (this.lineHeight + this.lineSpacing)
      );
    }
  }

  startDrag(e) {
    this.dragOffsetX = e.clientX - this.pos.x;
    this.dragOffsetY = e.clientY - this.pos.y;
    this.isDragging = true;
  }

  stopDrag() {
    this.isDragging = false;
  }

  setDebug(bool) {
    this.isDebug = bool;
    this.body.isDebug = bool;
  }
}