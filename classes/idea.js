class Idea {
  // Logistic stuff
  id = null;
  title = null;
  text = null;
  defText = this.text;
  dateCreated = null;
  dateUpdated = null;
  // contents = [];

  // Display stuff
  r = 20;
  width = 200;
  height = 200;
  textMargin = 16;
  titleHeight = 30;
  textHeight = 12;

  // Physics stuff
  bounciness = 0.8;
  bounceFriction = 0.9;
  friction = 0.99;

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

  // Relationships
  lens = null; // Parent

  // Runtime
  pos = null;
  vel = null;
  accel = null;
  dragOffsetX = 0;
  dragOffsetY = 0;

  // Config
  isDebug = false;
  isActive = false;
  isClicking = false;
  isDragging = false;
  isHovered = false;

  constructor (x = 0, y = 0) {
    this.pos = new Vector2D(x, y);
    this.vel = new Vector2D((Math.random()-.5)*1000, Math.random()*-500);
    this.accel = new Vector2D(0, 0);
    this.bodyColorDefault = getRandomColor();
    this.title = lorem(1);
    this.text = lorem(Math.floor(Math.random() * 10 + 20));
    // this.contents.push(this.title);
    // this.contents.push(this.text);

    // Generate body
    this.body = new Body(
      this.pos.x,
      this.pos.y,
      this.r,
      this.width,
      this.height
    );
    this.body.isDebug = this.isDebug;
    this.body.updateColor(this.bodyColorDefault, this.borderColorDefault);
    this.body.updateBorder(this.borderWidthDefault);
    // this.contents.push(this.body);

    //Generate title
    let titleX = this.pos.x - this.width / 2 + this.textMargin;
    let titleY = this.pos.y - this.height / 2 + this.textMargin;
    let titleWidth = this.width - 2 * this.textMargin;
    this.titleBox = new TextBox(
      this.title,
      titleX,
      titleY,
      titleWidth,
      this.titleHeight
    );
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

  // ---------- Main Methods ----------

  // Update function
  update = (secondsPassed) => {
    // Update velocity
    this.vel = this.vel.add(this.accel.multiply(secondsPassed));
    this.vel = this.vel.multiply(this.friction);

    // Update position
    this.pos = this.pos.add(this.vel.multiply(secondsPassed));

    // Boundary detection
    let boundLeft = 0;
    let boundRight = this.lens.$canvas.width;
    let boundTop = 0;
    let boundBot = this.lens.$canvas.height;

    let ideaBoundLeft = this.pos.x - this.width / 2;
    let ideaBoundRight = this.pos.x + this.width / 2;
    let ideaBoundTop = this.pos.y - this.height / 2;
    let ideaBoundBot = this.pos.y + this.height / 2;

    let overlap;

    if (ideaBoundLeft < boundLeft) {
      // overlap = boundLeft - ideaBoundLeft;
      // this.pos.x = boundLeft - overlap + this.width / 2;
      this.pos.x = boundLeft + this.width / 2;
      this.vel.x *= -1 * this.bounciness;
      this.vel.y *= this.bounceFriction;
    } else if (ideaBoundRight > boundRight) {
      // overlap = boundRight - ideaBoundRight;
      // this.pos.x = boundRight - overlap - this.width / 2;
      this.pos.x = boundRight - this.width / 2;
      this.vel.x *= -1 * this.bounciness;
      this.vel.y *= this.bounceFriction;
    }
    
    if (ideaBoundTop < boundTop) {
      // overlap = boundTop - ideaBoundTop;
      // this.pos.y = boundTop - overlap + this.height / 2;
      this.pos.y = boundTop + this.height / 2;
      this.vel.y *= -1 * this.bounciness;
      this.vel.x *= this.bounceFriction;
    } else if (ideaBoundBot > boundBot) {
      // overlap = boundBot - ideaBoundBot;
      // this.pos.y = boundBot - overlap - this.height / 2;
      this.pos.y = boundBot - this.height / 2;
      this.vel.y *= -1 * this.bounciness;
      this.vel.x *= this.bounceFriction;
    }

    // Update children
    this.body.update(this.pos.x, this.pos.y);

    let titleX = this.pos.x - this.width / 2 + this.textMargin;
    let titleY = this.pos.y - this.height / 2 + this.textMargin;
    this.titleBox.update(titleX, titleY);

    let textX = this.pos.x - this.width / 2 + this.textMargin;
    let textY = titleY + this.titleHeight + this.textMargin;
    this.textBox.update(textX, textY);
  }

  // Render function
  render = (ctx) => {
    // Render body
    this.body.render(ctx);

    // Render title
    this.titleBox.render(ctx);

    // Render text
    this.textBox.render(ctx);
  };

  // Save function
  save = () => {};

  // ---------- EVENTS ----------

  drag = (e) => {
    if (e.touches) {
      this.pos.x = e.touches[0].clientX - this.dragOffsetX;
      this.pos.y = e.touches[0].clientY - this.dragOffsetY;
    } else {
      this.pos.x = e.clientX - this.dragOffsetX;
      this.pos.y = e.clientY - this.dragOffsetY;
    }
  }

  setHovered = (bool) => {
    this.isHovered = bool;
    this.body.borderColor = bool
      ? this.borderColorHovered
      : this.borderColorDefault;
  }

  startDrag = (e) => {
    this.dragOffsetX = e.clientX - this.pos.x;
    this.dragOffsetY = e.clientY - this.pos.y;
    this.isDragging = true;
  }

  stopDrag = () => {
    this.isDragging = false;
  }

  setDebug = (bool) => {
    this.isDebug = bool;
    this.body.isDebug = bool;
    this.titleBox.isDebug = bool;
    this.textBox.isDebug = bool;
  }
}
