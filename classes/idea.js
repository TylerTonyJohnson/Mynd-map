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
  titleHeight = 30;
  textHeight = 12;

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
    this.text = lorem(Math.floor(Math.random() * 10 + 20));
    // this.contents.push(this.title);
    // this.contents.push(this.text);

    // Generate body
    this.body = new Body(this.pos.x, this.pos.y, this.r, this.width, this.height);
    this.body.isDebug = this.isDebug;
    this.body.updateColor(this.bodyColorDefault, this.borderColorDefault);
    this.body.updateBorder(this.borderWidthDefault);
    // this.contents.push(this.body);

    //Generate title
    let titleX = this.pos.x - this.width / 2 + this.textMargin;
    let titleY = this.pos.y - this.height / 2 + this.textMargin;
    let titleWidth = this.width - 2 * this.textMargin;
    this.titleBox = new TextBox(this.title, titleX, titleY, titleWidth, this.titleHeight);
    this.titleBox.isDebug = this.isDebug;
    this.titleBox.isShadow = true;

    // Generate text
    let textX = this.pos.x - this.width / 2 + this.textMargin;
    let textY = titleY + this.titleHeight + this.textMargin;
    let textWidth = this.width - 2 * this.textMargin;
    let textHeight = this.height - 3 * this.textMargin - this.titleHeight;
    this.textBox = new TextBox(this.text, textX, textY, textWidth, textHeight);
    this.textBox.isDebug = this.isDebug;
    this.textBox.fontSize = this.textHeight;
    this.textBox.isShadow = false;
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

    let titleX = this.pos.x - this.width / 2 + this.textMargin;
    let titleY = this.pos.y - this.height / 2 + this.textMargin;
    this.titleBox.update(titleX, titleY);

    let textX = this.pos.x - this.width / 2 + this.textMargin;
    let textY = titleY + this.titleHeight + this.textMargin;
    this.textBox.update(textX, textY);
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
    this.titleBox.render(ctx);

    // Render text
    this.textBox.render(ctx);
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
    this.titleBox.isDebug = bool;
    this.textBox.isDebug = bool;
  }
}