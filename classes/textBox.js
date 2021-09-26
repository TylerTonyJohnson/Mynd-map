class TextBox {
  isDebug = false;
  isEditing = false;

  // Font size
  font = "Rubik";
  fontSize = 20; // in pixels
  color = "white";
  textAlignment = "left";
  textBaseline = "middle";

  constructor(text, x, y, width = 50, height = this.fontSize) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  update = (x, y) => {
    this.x = x;
    this.y = y;
  };

  render = (ctx) => {
    // Render title
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 4;
    ctx.textAlign = this.textAlignment;
    ctx.textBaseline = "top";
    ctx.font = `${this.fontSize}px ${this.font}`;
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();


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
        this.x - this.width / 2 + this.textMargin,
        this.y +
          this.lineSpacing +
          this.lineHeight +
          i * (this.lineHeight + this.lineSpacing)
      );
    }

    // Draw border box if in debug mode
    if (this.isDebug) {
      ctx.save();
      ctx.strokeStyle = "blue";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.restore();
    }

  };
}
