// -- Helper Functions --

// Get sequential letter
function getLetter(ind) {
  let alphabet = "abcdefghijklmnopqrstuvwxyz";
  return alphabet[ind];
}

// Get random letter
function getRandomLetter(num = 1) {
  let alphabet = "abcdefghijklmnopqrstuvwxyz";
  let letter = "";
  for (let i = 0; i < num; i++)
    letter = letter + alphabet[Math.floor(Math.random() * alphabet.length)];
  return letter;
}

// Get random color
function getRandomColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777216)
      .toString(16)
      .padStart(6, "0")
  );
}

//  -- DOM Helpers --

// ID shortcut
$ = (name) => {
  return document.getElementById(name);
}
  
// Create element with HTML in javascript
$Create = (html) => {
  let template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

getDistFromElem = (mouseEvent, element) => {
  let mouseLoc = {x: mouseEvent.clientX, y: mouseEvent.clientY};
  let elemLoc = element.getBoundingClientRect();
  let distX, distY;

  switch (true) {
    case (mouseLoc.x < elemLoc.left):
      distX = elemLoc.left - mouseLoc.x;
      break;
    case (mouseLoc.x > elemLoc.right):
      distX = mouseLoc.x - elemLoc.right;
      break;
    case (mouseLoc.x >= elemLoc.left && mouseLoc.x <= elemLoc.right):
      distX = 0;
      break;
    default:
      distX = -1;
      break;
  }

  switch (true) {
    case (mouseLoc.y < elemLoc.top):
      distY = elemLoc.top - mouseLoc.y;
      break;
    case (mouseLoc.y > elemLoc.bottom):
      distY = mouseLoc.y - elemLoc.bottom;
      break;
    case (mouseLoc.y >= elemLoc.top && mouseLoc.y <= elemLoc.bottom):
      distY = 0;
      break;
    default:
      distY = -1;
      break;
  }

  return Math.hypot(distX, distY);
}