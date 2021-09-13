// DOM stuff
"use strict";
let $canvas;
let ctx;
window.onload = setup;

// Global data variables
let ideas = [];
let shapes = [];
let anchor = {};
let secondsPassed = 0;
let oldTimeStamp = 0;
let offsetX = 0;
let offsetY = 0;
let hoverTargets = [];
let leftClickTarget = null;
let rightClickTarget = null;
let dragTarget = null;

// Config stuff
let circleNum = 26;
let ideaCount = 3;
let isDebug = false;

// Setup function
function setup() {
  $canvas = $("canvas");
  ctx = $canvas.getContext("2d");

  // Disable canvas context menu
  $canvas.addEventListener("contextmenu", (event) => event.preventDefault());

  // Size canvas
  $canvas.width = $canvas.clientWidth;
  $canvas.height = $canvas.clientHeight;

  let boundingBox = $canvas.getBoundingClientRect();
  offsetX = boundingBox.left;
  offsetY = boundingBox.top;

  // Mouse / touch input events
  $canvas.onmousedown = processTouchDown;
  $canvas.onmouseup = processTouchUp;
  $canvas.onmousemove = processMouseMove;
  
  $canvas.ontouchstart = processTouchDown;
  $canvas.ontouchend = processTouchUp;
  $canvas.ontouchmove = processTouchMove;
  $canvas.ontouchcancel = processTouchCancel;

  // Window events
  window.onresize = resizeScreen;
  window.onscroll = resizeScreen;

  // Generate anchor
  anchor.x = $canvas.width / 2;
  anchor.y = $canvas.height / 2;

  // Generate shapes
  for (let i = 0; i < circleNum; i++) {
    let newCircle = new Circle(
      Math.random() * $canvas.width,
      (Math.random() * $canvas.height) / 2
    );
    newCircle.vel = new Vector2D(Math.random() * 1000, Math.random() * 1000);
    newCircle.bodyColor =
      "#" +
      Math.floor(Math.random() * 16777216)
        .toString(16)
        .padStart(6, "0");
    newCircle.text = getLetter(circleNum - i - 1);
    shapes.push(newCircle);
  }

  // Generate some ideas
  for (let i = 0; i < ideaCount; i++) {
    let newIdea = new Idea(
      Math.random() * $canvas.width * 0.6 + $canvas.width * 0.2,
      Math.random() * $canvas.height * 0.6 + $canvas.height * 0.2
    );
    ideas.push(newIdea);
  }

  window.requestAnimationFrame(frameLoop);
}

// Main frame function
function frameLoop(timeStamp) {
  // Calculate how much time has passed
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  // Pass the time to the update
  shapes.forEach((shape) => {
    shape.update(secondsPassed);
  });

  // Update the ideas each frame
  ideas.forEach((idea) => {
    idea.update();
  });

  // Call draw function
  draw();

  // The loop has reached its end. Keep requesting frames
  window.requestAnimationFrame(frameLoop);
}

// Main draw function
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);

  // Draw background
  ctx.fillStyle = "rgb(50, 50, 50)";
  ctx.fillRect(0, 0, $canvas.width, $canvas.height);

  // Draw circles
  shapes.forEach((shape) => {
    shape.draw(ctx);
  });

  // Draw anchor
  ctx.beginPath();
  ctx.arc(anchor.x, anchor.y, 10, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.strokeStyle = "#999999";
  ctx.stroke();

  // Draw ideas
  ideas.forEach((idea) => {
    idea.render(ctx);
  });

  // Draw bounding box
  if (isDebug) {
    ctx.strokeStyle = "green";
    ctx.lineWidth = 4;
    ctx.strokeRect(
      $canvas.width * 0.2,
      $canvas.height * 0.2,
      $canvas.width * 0.6,
      $canvas.height * 0.6
    );
  }
}

// ---------- EVENTS ----------

// Window resize event
function resizeScreen(e) {
  console.log("resizing");
  $canvas.width = $canvas.clientWidth;
  $canvas.height = $canvas.clientHeight;

  let boundingBox = $canvas.getBoundingClientRect();
  offsetX = boundingBox.left;
  offsetY = boundingBox.top;
}

// Process click / touch release event
function processTouchUp(e) {
  console.log("Touch release event");
}

// Process mouse hover move event
function processMouseMove(e) {
  console.log("Mouse move event");
}

// Process mouse held down / touch move event
function processTouchMove(e) {
  console.log("Touch move event");
}

// Process touch cancel event
function processTouchCancel(e) {
  console.log("Touch cancel event");
} 

// Process mouse click / touch down event
function processTouchDown(e) {
  e.preventDefault();
  e.stopPropagation();

  // Figure out if the event is touch or mouse
  if (e.touches) {
    console.log("Touch down event");
  }

  console.log(e);

  switch (e.which) {
    case 1:
      leftClickTarget = getMouseTarget(e);
      if (leftClickTarget !== null) {
        dragTarget = leftClickTarget;
        dragTarget.startDrag(e);
      }
      console.log("Left mouse - " + leftClickTarget?.text);
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
}

// Mouse up event
function mouseUp(e) {
  e.preventDefault();
  e.stopPropagation();

  switch (e.which) {
    case 1:
      let currentTarget = getMouseTarget(e);  

      // Dragging behavior
      if ( currentTarget === leftClickTarget && currentTarget?.isDragging) {
        dragTarget.stopDrag();
      }

      // Clicking behavior
      if ( currentTarget === leftClickTarget && currentTarget !== null) {
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
}

// Mouse move event
function processMouseMove(e) {
  e.preventDefault();
  e.stopPropagation();

  let currentTarget;

  // Notice / set stuff
  currentTarget = getMouseTarget(e);

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
}

// Get whatever the mouse is pointing at, just one object.
function getMouseTarget(e) {
  // Get current mouse position
  let mouseX = parseInt(e.clientX - offsetX);
  let mouseY = parseInt(e.clientY - offsetY);

  // Test for first object that overlaps with mouse
  for (let i = ideas.length - 1; i >= 0; i--) {
    let thisIdea = ideas[i];
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
}

// Save document function
function save() {
  console.log("save document");
}

// Toggle debug viewer (developer tools)
function toggleDebug() {
  isDebug = !isDebug;
  ideas.forEach((idea) => {
    idea.isDebug = isDebug;
  });
}