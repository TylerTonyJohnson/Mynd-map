class Idea {
    r = 60;
    text = "n";
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
        let path = new Path2D("M182.15 0C192.01 0 200 7.99 200 17.85C200 64.28 200 185.72 200 232.15C200 242.01 192.01 250 182.15 250C145.72 250 54.28 250 17.85 250C7.99 250 0 242.01 0 232.15C0 185.72 0 64.28 0 17.85C0 7.99 7.99 0 17.85 0C54.28 0 145.72 0 182.15 0Z")
        ctx.beginPath();
        // ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#996633";
        ctx.fill(path);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#336699";
        ctx.stroke(path);
        ctx.closePath();

        // Draw text
        ctx.font = "100px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, this.pos.x, this.pos.y)
    }
}