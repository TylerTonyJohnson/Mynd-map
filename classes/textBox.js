class TextBox {
  // Font style
  font = "Rubik";
  fontSize = 20; // in pixels
  color = "white";
  isShadow = true;
  isWrap = true;
  // isBorder = true;
  
  // Alignment
  textAlignment = "left";
  textBaseline = "middle";
  lineHeight = 16;
  lineSpacing = 0;

  // Runtime
  isDebug = false;
  isEditing = false;

  constructor(text, x, y, width = 50, height = this.fontSize) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // Runtime update function
  update = (x, y) => {
    this.x = x;
    this.y = y;
  };

  // Render title
  render = (ctx) => {
    // Set style
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.shadowColor = (this.isShadow ? "rgba(0, 0, 0, 0.5)" : "");
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 4;
    ctx.textAlign = this.textAlignment;
    ctx.textBaseline = "top";
    ctx.font = `${this.fontSize}px ${this.font}`;
    ctx.strokeStyle = "black";
    // ctx.lineWidth = 3;
    
    // Draw border box if in editing mode
    // TODO: maybe this can be not rendered over the debug box
    if (this.isEditing) {
      ctx.save();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1;
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.restore();
    }

    // Multi-line support
    let lines = [];
    if (this.isWrap) {
      let words = this.text.split(" ");
      let currentLine = words[0];
      // console.log(words);

      // Chop up text
      for (let i = 1; i < words.length; i++) {
        let word = words[i];
        let wordWidth = ctx.measureText(currentLine + " " + word).width;
        if (wordWidth < this.width) {
          currentLine += " " + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      lines.push(currentLine);
    } else {
      lines.push(this.text);
    }

    // Render all lines (depending on wrap setting)
    for (let i = 0; i < lines.length; i++) {
      if (this.isBorder) {
        ctx.strokeText(
          lines[i],
          this.x,
          this.y + i * (this.lineHeight + this.lineSpacing)
        );       
      }
      ctx.fillText(
        lines[i],
        this.x,
        this.y + i * (this.lineHeight + this.lineSpacing)
      );
    }

    // Draw border box if in debug mode
    if (this.isDebug) {
      ctx.save();
      ctx.strokeStyle = "blue";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.restore();
    }


    ctx.restore();
  };
}
