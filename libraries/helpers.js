// Helper Functions

function getRandomLetter() {
  let alphabet = "abcdefghijklmnopqrstuvwxyz";
  let letter = alphabet[Math.floor(Math.random() * alphabet.length)];
  return letter;
}

//  -- DOM Helpers --

// ID shortcut
function $(name) {
  return document.getElementById(name);
}
