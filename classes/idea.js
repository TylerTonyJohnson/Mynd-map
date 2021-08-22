class Idea {
    r = 60;
    text = "Idea";
    dateCreated = null;
    dateUpdated = null;

    constructor(x, y) {
        this.pos = new Vector2D(x, y);
    }

    // Text area to write in

    // Mood recorder

    // Render function
    render(ctx) {
        // Draw a circle
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#996633";
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#336699";
        ctx.stroke();
        ctx.closePath();

        // Draw text
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, this.pos.x, this.pos.y)
    }
}