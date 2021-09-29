class IdeaLens {
  ideas = [];
  shapes = [];

  // Display stuff
  backgroundColor = "rgb(50, 50, 50)";
  width = 300;
  height = 300;

  // Config stuff
  circleNum = 26;
  ideaCount = 3;
  isDebug = false;

  // Runtime stuff
  offsetX = null;
  offsetY = null;

  activeIdea = null;
  hoveredIdea = null;

  constructor() {
    // Create a canvas
    let $canvasContainer = $("canvas-container");
    this.$canvas = document.createElement("canvas");
    $canvasContainer.appendChild(this.$canvas);

    // Configure canvas
    this.$canvas.width = this.width;
    this.$canvas.height = this.height;

    // Get context
    this.ctx = this.$canvas.getContext("2d");

    // Disable canvas context menu
    // this.$canvas.addEventListener("contextmenu", (event) => event.preventDefault());
    this.$canvas.oncontextmenu = this.showContextMenu;

    // Size canvas
    this.$canvas.width = this.$canvas.clientWidth;
    this.$canvas.height = this.$canvas.clientHeight;

    let boundingBox = this.$canvas.getBoundingClientRect();
    this.offsetX = boundingBox.left;
    this.offsetY = boundingBox.top;

    // Mouse / touch input events
    this.$canvas.onmousedown = this.processTouchDown;
    this.$canvas.onmouseup = this.processTouchUp;
    this.$canvas.onmousemove = this.processMouseMove;

    this.$canvas.ontouchstart = this.processTouchDown;
    this.$canvas.ontouchend = this.processTouchUp;
    this.$canvas.ontouchmove = this.processTouchMove;
    this.$canvas.ontouchcancel = this.processTouchCancel;

    // Generate some ideas
    for (let i = 0; i < this.ideaCount; i++) {
      this.add();
    }

    // Create context menu
    this.createContextMenu();
  }

  // Function to add a new idea to the canvas
  add = (x, y) => {
    if (!x || !y) {
      x = Math.random() * this.$canvas.width * 0.6 + this.$canvas.width * 0.2;
      y = Math.random() * this.$canvas.height * 0.6 + this.$canvas.height * 0.2;
    }
    console.log("Adding new idea at " + x + " - " + y);
    let newIdea = new Idea(x, y);
    this.ideas.push(newIdea);
  };

  // Function to delete an existing idea from the canvas
  delete = (idea) => {
    if (idea) {
      let ind = this.ideas.indexOf(idea);
      this.ideas.splice(ind, 1);
    } else {
      this.ideas.pop();
    }
  };

  // Runtime update every frame (for position and display)
  update = (secondsPassed) => {
    // // Update the shapes each frame
    // this.shapes.forEach((shape) => {
    //   shape.update(secondsPassed);
    // });

    // Update the ideas each frame
    this.ideas.forEach((idea) => {
      idea.update(secondsPassed);
    });
  };

  render = () => {
    // Clear the canvas
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw background
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.$canvas.width, this.$canvas.height);
    this.ctx.restore();

    // Draw ideas
    this.ideas.forEach((idea) => {
      idea.render(this.ctx);
    });

    // Draw bounding box
    if (this.isDebug) {
      this.ctx.save();
      this.ctx.strokeStyle = "green";
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(
        this.$canvas.width * 0.2,
        this.$canvas.height * 0.2,
        this.$canvas.width * 0.6,
        this.$canvas.height * 0.6
      );
      this.ctx.restore();
    }
  };

  // ---------- EVENTS ----------

  // Window resize event
  resize = (e) => {
    console.log("resizing");
    this.$canvas.width = this.$canvas.clientWidth;
    this.$canvas.height = this.$canvas.clientHeight;

    let boundingBox = this.$canvas.getBoundingClientRect();
    this.offsetX = boundingBox.left;
    this.offsetY = boundingBox.top;
  };

  processTouchDown = (e) => {
    console.log("Touch down event");
  };

  // Process click / touch release event
  processTouchUp = (e) => {
    console.log("Touch release event");
  };

  // Process mouse hover move event
  processMouseMove = (e) => {
    console.log("Mouse move event");
  };

  // Process mouse held down / touch move event
  processTouchMove = (e) => {
    console.log("Touch move event");
  };

  // Process touch cancel event
  processTouchCancel = (e) => {
    console.log("Touch cancel event");
  };

  // Process mouse click / touch down event
  processTouchDown = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.hideContextMenu();

    // console.log(e);

    switch (e.which) {
      case 1:
        leftClickTarget = this.getMouseTarget(e);
        if (leftClickTarget !== null) {
          dragTarget = leftClickTarget;
          dragTarget.startDrag(e);
        }
        console.log("Left mouse - " + leftClickTarget?.title);
        break;
      case 2:
        console.log("Middle mouse button down");
        break;
      case 3:
        console.log("Right mouse button down");
        break;
      default:
        console.log("Unexpected mouse input");
    }
  };

  // Mouse up event
  processTouchUp = (e) => {
    e.preventDefault();
    e.stopPropagation();

    switch (e.which) {
      case 1:
        let currentTarget = this.getMouseTarget(e);

        // Dragging behavior
        if (currentTarget === leftClickTarget && currentTarget?.isDragging) {
          dragTarget.stopDrag();
        }

        // Clicking behavior
        if (currentTarget === leftClickTarget && currentTarget !== null) {
          leftClickTarget.isActive = true;
        }
        console.log("Left mouse button up");
        break;
      case 2:
        console.log("Middle mouse button up");
        break;
      case 3:
        console.log("Right mouse button up");
        break;
      default:
        console.log("Unexpected mouse input");
    }
  };

  // Mouse move event
  processMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let currentTarget;

    // Notice / set stuff
    currentTarget = this.getMouseTarget(e);

    // Set current target behavior
    if (currentTarget !== null) {
      hoverTargets.push(currentTarget);
      // Handle dragging
      if (currentTarget.isDragging) {
        currentTarget.drag(e);
      }
    }

    // Clean up non-targeted objects
    hoverTargets.forEach((target) => {
      if (target === currentTarget) {
        // Currently looking at hovered entity
        if (!target.isHovered) {
          target.isHovered = true;
        }
      } else {
        target.isHovered = false;
        hoverTargets.splice(hoverTargets.indexOf(target), 1);
      }
    });
  };

  // Context menu
  showContextMenu = (e) => {
    e.preventDefault();

    console.log("Showing context menu");
    // See if we're targeting anything
    let currentTarget = this.getMouseTarget(e);
    if (currentTarget) {
      this.activeIdea = currentTarget;
    }
    // console.log(currentTarget);

    // $("overlay").style.display = "block";
    this.$contextMenu.style.display = "flex";
    this.$contextMenu.style.left = e.clientX - this.offsetX + "px";
    this.$contextMenu.style.top = e.clientY - this.offsetY + "px";

    // console.log(this.$contextMenu.style.left)
    // console.log(this.$contextMenu.style.top)
  };

  hideContextMenu = (e) => {
    this.$contextMenu.style.display = "none";
  }

  // ---------- UTILITY FUNCTIONS ----------

  // Get whatever the mouse is pointing at, just one object.
  getMouseTarget = (e) => {
    // Get current mouse position
    let mouseX = parseInt(e.clientX - this.offsetX);
    let mouseY = parseInt(e.clientY - this.offsetY);

    // Test for first object that overlaps with mouse (only accepts rectangles)
    for (let i = this.ideas.length - 1; i >= 0; i--) {
      let thisIdea = this.ideas[i];
      if (
        mouseX > thisIdea.pos.x - thisIdea.width / 2 &&
        mouseX < thisIdea.pos.x + thisIdea.width / 2 &&
        mouseY > thisIdea.pos.y - thisIdea.height / 2 &&
        mouseY < thisIdea.pos.y + thisIdea.height / 2
      ) {
        return thisIdea;
        break;
      }
    }
    return null;
  };

  // Set debug mode
  setDebug = (bool = null) => {
    if (bool === null) {
      this.isDebug = !this.isDebug;
    } else {
      this.isDebug = bool;
    }

    this.ideas.forEach((idea) => {
      idea.setDebug(this.isDebug);
    });
  };

  // Create context menu
  createContextMenu = () => {
    // Create a context menu from template
    this.$contextMenu = $("context-menu").cloneNode(true);

    // Add button
    this.$addButton = $("context-menu-add-button").cloneNode(true);
    this.$addButton.style.display = "inherit";
    this.$addButton.addEventListener("click", this.add);

    // Delete button
    this.$deleteButton = $("context-menu-delete-button").cloneNode(true);
    this.$deleteButton.style.display = "inherit";
    this.$deleteButton.addEventListener("click",this.delete);

    // Append buttons to context menu
    this.$contextMenu.appendChild(this.$addButton);
    this.$contextMenu.appendChild(this.$deleteButton);
    $("canvas-container").appendChild(this.$contextMenu);
  };
}
