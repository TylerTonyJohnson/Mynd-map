// DOM stuff
"use strict";
window.onload = setup;
let pearl, lens, hand;


// Setup function
function setup() {

  // Create core MVC engine
  pearl = new Pearl();
  lens = new Surface(null, $("surface"));
  hand = new Hand(pearl, lens);

  lens.target = hand.pearl.grains;  // Create two-way reference
  lens.hand = hand;
  hand.loadPearl();
  // hand.render();
}

// ---------- Defaults ----------

function createDefaultPearl() {

  let defaultPearl = [];
  for (let i = 0; i < 3; i++) {
    defaultPearl.push(new Idea());
  }
  return defaultPearl; 
}













let secondsPassed = 0;
let oldTimeStamp = 0;
// let hoverTargets = [];
let leftClickTarget = null;
let rightClickTarget = null;
let dragTarget = null;

// Runtime stuff
let ideaLens = null;
let initialIdeas = 10;

// Config stuff
let isDebug = false;


function setup2() {
  // Create one idea lens
  let firstLens = new IdeaLens();

      // Generate some ideas
  for (let i = 0; i < initialIdeas; i++) {
    firstLens.addIdea();
  }

  // Add a strand to the first lens
  for (let i = 0; i < initialIdeas-1; i++) {
    firstLens.addStrand(firstLens.ideas[i], firstLens.ideas[i+1]);
  }

  // $("add-button").addEventListener("click", firstLens.add);
  // ideaLens.push(firstLens);
  ideaLens = firstLens;

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
  // ideaLens.forEach((ideaLens) => {
  ideaLens.update(secondsPassed);
  // });

  // Call main draw function
  // ideaLens.forEach((ideaLens) => {
  ideaLens.render();
  // });

  // The loop has reached its end. Keep requesting frames
  window.requestAnimationFrame(frameLoop);
}

// ---------- WINDOW EVENTS ----------

// Window resize event
function resizeScreen(e) {
  console.log("resizing");
  // ideaLens.forEach((ideaLens) => {
  ideaLens.resize();
  // });
}

// Triggered when user leaves the window (or alt-tabs)
function handleBlur() {
  // alert("Left the screen");
  // TODO

  // Deactivate any dragging or moving functionality.
}

// ---------- UTILITY FUNCTIONS ----------

// Toggle debug viewer (developer tools)
function toggleDebug() {
  isDebug = !isDebug;
  // ideaLens.forEach((ideaLens) => {
  ideaLens.setDebug(isDebug);
  // });
}
