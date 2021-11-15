class Strand {

    // Logistic stuff
    id = null;              // Error value
    dateCreated = null;     // Error value
    dateUpdated = null;     // Error value

    // Style
    color = "red";          // Error value
    colorDefault = "turquoise";
    thickness = 20;         // Error value
    thicknessDefault = 4;
    thicknessHovered = 8;

    // Relationships
    lens = null;            // Parent
    nodes = [];             // Nodes to attach to

    // Runtime
    x1 = 0;                 // Error value
    x2 = 100;               // Error value
    y1 = 0;                 // Error value
    y2 = 100;               // Error value

    // Config
    isDebug = false;        // For debug toggle
    isActive = false;       // For editing
    isDragging = false;     // Not sure I need this

    constructor() {
        this.color = this.colorDefault;
        this.thickness = this.thicknessDefault;
    }

    // Add node function
    addNode = (node) => {
        this.nodes.push(node);
    }

    // Update function
    update = (secondsPassed) => {

        // Update positions based on node positions
        if (this.nodes.length > 0) {
            this.x1 = this.nodes[0].pos.x;
            this.y1 = this.nodes[0].pos.y;
            this.x2 = this.nodes[1].pos.x;
            this.y2 = this.nodes[1].pos.y;
        }
    }

    // Render function
    render = (ctx) => {
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.thickness;

        // this.path = new Path2D();        // Need to figure out how to use paths.
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    
        ctx.restore();
    }

}