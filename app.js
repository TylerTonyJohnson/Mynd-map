// DOM stuff
"use strict";
window.onload = setup;

let secondsPassed = 0;
let oldTimeStamp = 0;
let hoverTargets = [];
let leftClickTarget = null;
let rightClickTarget = null;
let dragTarget = null;

// Runtime stuff
let ideaLenses = [];

// Config stuff
let isDebug = false;

// Setup function
function setup() {
  // Try to load an existing ideaLens array
  load();

  // Create one idea lens
  let firstLens = new IdeaLens();
  $("add-button").addEventListener("click", firstLens.add);
  ideaLenses.push(firstLens);

  // Window events
  window.onresize = resizeScreen;
  window.onscroll = resizeScreen;
  window.onblur = handleBlur;

  // Call frame loop (about 60 fps)
  window.requestAnimationFrame(frameLoop);
}

// WebFont.load({
//   google: {
//     families: ["Rubik"]
//   }
// });

// Main frame function
function frameLoop(timeStamp) {
  // Calculate how much time has passed
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  // Pass the time to the update
  ideaLenses.forEach((ideaLens) => {
    ideaLens.update(secondsPassed);
  });

  // Call main draw function
  draw();

  // The loop has reached its end. Keep requesting frames
  window.requestAnimationFrame(frameLoop);
}

// Main draw function
function draw() {
  // Call draw function
  ideaLenses.forEach((ideaLens) => {
    ideaLens.render();
  });
}

// ---------- EVENTS ----------

// Window resize event
function resizeScreen(e) {
  console.log("resizing");
  ideaLenses.forEach((ideaLens) => {
    ideaLens.resize();
  });
}

// Triggered when user leaves the window (or alt-tabs)
function handleBlur() {
  // alert("Left the screen");
  // TODO
}

// ---------- UTILITY FUNCTIONS ----------

// Save document function
function save() {
  console.log("save document");
}

function load() { 
  console.log("load document");
}


// Toggle debug viewer (developer tools)
function toggleDebug() {
  isDebug = !isDebug;
  ideaLenses.forEach((ideaLens) => {
    ideaLens.setDebug(isDebug);
  });
}
