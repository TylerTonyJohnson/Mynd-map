class Idea {
    title = null;
    text = "hi";
    dateCreated = null;
    dateUpdated = null;

    // Display stuff
    r = 20;
    width = 200;
    height = 250;
    bodyColor = "#996633";
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

    // Render function
    render(ctx) {
        // Draw a circle
        // let path = new Path2D("M182.15 0C192.01 0 200 7.99 200 17.85C200 64.28 200 185.72 200 232.15C200 242.01 192.01 250 182.15 250C145.72 250 54.28 250 17.85 250C7.99 250 0 242.01 0 232.15C0 185.72 0 64.28 0 17.85C0 7.99 7.99 0 17.85 0C54.28 0 145.72 0 182.15 0Z")
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
        // ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);



        // Draw text
        ctx.font = "100px Arial";
        ctx.fillStyle = "white";
        // ctx.textAlign = "center";
        // ctx.textBaseline = "middle";
        ctx.fillText(this.text, this.pos.x + this.width / 2, this.pos.y + this.height / 2);
    }
}