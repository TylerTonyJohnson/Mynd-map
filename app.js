// DOM stuff
"use strict";
window.onload = setup;

let secondsPassed = 0;
let oldTimeStamp = 0;
// let hoverTargets = [];
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
  // load();

  // Create one idea lens
  let firstLens = new IdeaLens();
  // $("add-button").addEventListener("click", firstLens.add);
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
  ideaLenses.forEach((ideaLens) => {
    ideaLens.render();
  });

  // The loop has reached its end. Keep requesting frames
  window.requestAnimationFrame(frameLoop);
}

// ---------- WINDOW EVENTS ----------

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
  localStorage.ideaLenses = JSON.stringify(ideaLenses);
}

function load() { 
  console.log("load document");

  // Create a structured object to save
  let loadObject = {};



  // let parsedLenses = JSON.parse(localStorage.ideaLenses);
  // // console.log(parsedIdeas)

  // // Handle lenses
  // let newLenses = [];
  // parsedLenses.forEach((lens) => {
  //   // console.log(lens.ideas);
  //   let newLens = new IdeaLens();
  //   let oldLens = lens;
  //   let fullLens = Object.assign(newLens, oldLens);

  //   // Handle ideas
  //   let newIdeas = [];
  //   fullLens.ideas.forEach((idea) => {
  //     // console.log(idea);
  //     let newIdea = new Idea();
  //     let oldIdea = idea;
  //     let fullIdea = Object.assign(newIdea, oldIdea);
      

  //     newIdeas.push(fullIdea);
  //   })

  //   fullLens.ideas = newIdeas;

  //   newLenses.push(fullLens);
    
  // })
  // ideaLenses = newLenses;
}

// Toggle debug viewer (developer tools)
function toggleDebug() {
  isDebug = !isDebug;
  ideaLenses.forEach((ideaLens) => {
    ideaLens.setDebug(isDebug);
  });
}
