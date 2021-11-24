// DOM stuff
"use strict";

window.onload = setup;

let hand;
let lens;
let pearl;

// Setup function
function setup() {

  // Create core MVC engine
  hand = new Hand();
  lens = new Lens();
  pearl = new Pearl();

  // Initialize MVC engine
  hand.setPearl(pearl);
  hand.addGrain("Hi");
  hand.addGrain(new Idea());
  hand.addGrain(new Idea());

  surface(pearl);
  
  // Start MVC engine

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

// Save document function
function save() {
  console.log("save document");
  localStorage.ideaLenses = JSON.stringify(ideaLens);
}

function load() { 
  console.log("load document");

  // Create a structured object to save
  let loadObject = {};



  let parsedLenses = JSON.parse(localStorage.ideaLenses);
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
  // ideaLens.forEach((ideaLens) => {
  ideaLens.setDebug(isDebug);
  // });
}
