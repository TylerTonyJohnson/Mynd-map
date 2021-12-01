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

function surface(text) {

  let tempText;
  switch(typeof(text)) {
    case "string":
      tempText = text;
      break;
    case "object":

      // Render with method 1
      let tree = JsonView.createTree(text);
      JsonView.render(tree, $("surface1"));

      // Render with method 2
      let tree2 = Tree2.CreateTree(text);
      let jsonView2 = new JsonView2(tree2);
      jsonView2.render($("surface2"));

      // Render with method 3



      // tempText = JSON.stringify(text);
      break;
  }

  // $("surface").textContent= tempText;
}
    