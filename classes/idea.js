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
    borderColor = "#336699";

    // Runtime
    isHovered = false;
    isDragging = false;

    constructor(x, y) {
        this.pos = new Vector2D(x, y);
    }

    // Text area to write in

    // Mood recorder

    // Update function
    update() {
        if (this.isHovered) {
            this.text = "!";
            this.bodyColor = "red";
        } else {
            this.text = this.prevText;
            this.bodyColor = this.prevBodyColor;
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
        ctx.quadraticCurveTo(this.pos.x + this.width, this.pos.y, this.pos.x + this.width, this.pos.y + this.r);
        ctx.lineTo(this.pos.x + this.width, this.pos.y + this.height - this.r);
        ctx.quadraticCurveTo(this.pos.x + this.width, this.pos.y + this.height, this.pos.x + this.width - this.r, this.pos.y + this.height);
        ctx.lineTo(this.pos.x + this.r, this.pos.y + this.height);
        ctx.quadraticCurveTo(this.pos.x, this.pos.y + this.height, this.pos.x, this.pos.y + this.height - this.r);
        ctx.lineTo(this.pos.x, this.pos.y + this.r);
        ctx.quadraticCurveTo(this.pos.x, this.pos.y, this.pos.x + this.r, this.pos.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Draw text
        ctx.font = "100px Arial";
        ctx.fillStyle = "white";
        // ctx.textAlign = "center";
        // ctx.textBaseline = "middle";
        ctx.fillText(this.text, this.pos.x + this.width / 2, this.pos.y + this.height / 2);
    }
}