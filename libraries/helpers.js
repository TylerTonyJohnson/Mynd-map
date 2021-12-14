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
function $(name) {
  return document.getElementById(name);
}
  
// Create element with HTML in javascript
$create = (html) => {
  let template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
} 