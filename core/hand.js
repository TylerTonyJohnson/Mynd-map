// The purpose of this is to interact with the data

class Hand {
  pearl = null;
  lens = null;

  constructor (pearl, lens) {
    this.pearl = pearl || null;
    this.lens = lens || null;
  }

  // ---------- Pearl CRUD functions ----------  

  // Add grain to pearl
  addGrain = (grain = null) => {
    console.log("adding grain");
    if (grain) {
      this.pearl.grains.push(grain);
    } else {
      this.pearl.grains.push(new Idea());
    }
    this.render();
  }

  // Remove grain from pearl
  removeGrain = (grain = null) => {
    if (grain) {
      let ind = this.pearl.grains.indexOf(grain);
      this.pearl.grains.splice(ind, 1);
    } else {
      this.pearl.grains.pop();
    }
    this.render();
  };

  // Save to local storage
  savePearl = (thisPearl = this.pearl) => {

    localStorage.pearl = JSON.stringify(thisPearl);
    this.render();
  }

  // Load from local storage
  loadPearl = () => {
    if (localStorage.pearl) {
      this.pearl = JSON.parse(localStorage.pearl);
      this.render();
    }
  }

  // Reset to default
  resetPearl = () => {
    this.pearl.grains = createDefaultPearl();
    this.render();
  }


  // ---------- View Functions (Rendering) ----------

  // Render the pearl to be visible to the user
  render = () => {

    // Renderer 1
    let tree = JsonView.createTree(this.pearl.grains);
    JsonView.render(tree, $("surface1"));
    // JsonView.expandChildren(tree);

    // // Renderer 2
    // $("surface2").textContent = JSON.stringify(this.pearl,null,2);
    
    // Renderer 3
    this.lens.render();
  }

  toggleDebug = () => {
    // If there's a view, change it to debug mode. Otherwise, do nothing
    if (this.lens) {
      this.lens.toggleDebug();
    } else {
      alert("There is no lens to view debug through");
    }
  }


  // ---------- Interaction Events ----------

  // Create context menu
  createContextMenu = (e) => {

    e.preventDefault();
    $("context-menu-container").innerHTML = "";
    
    let mouseX = e.clientX;
    let mouseY = e.clientY;


    let $contextMenu = $create(`
      <div id="context-menu" class="context-menu"></div>
    `);

    let $addButton = $create(`
    <div id="context-menu-add-button" class="context-menu-button">
      <span class="material-icons context-menu-button-component"> add </span>
      <div class="context-menu-button-component">Add</div>
    </div>
    `);
    $addButton.style.display = "inherit";
    $addButton.onclick = function(e) {
      hand.addGrain();
      $("context-menu-container").innerHTML = "";
    }

    let $deleteButton = $create(`
    <div id="context-menu-delete-button" class="context-menu-button">
      <span class="material-icons context-menu-button-component"> delete </span>
      <div class="context-menu-button-component">Delete</div>
    </div>
    `);
    $deleteButton.style.display = "inherit";
    $deleteButton.onclick = this.removeGrain();


    // Construct menu
    $contextMenu.appendChild($addButton);
    $contextMenu.appendChild($deleteButton);
    $("context-menu-container").appendChild($contextMenu);

    // Configure
    $contextMenu.style.left = mouseX + "px";
    $contextMenu.style.top = mouseY + "px";

    $contextMenu.style.display = "flex";
    console.log($contextMenu);

    // // Create a context menu from template
    // let $contextMenu = $("context-menu").cloneNode(true);
    // $contextMenu.oncontextmenu = event => event.preventDefault();
    
    // // Add button
    // let $addButton = $("context-menu-add-button").cloneNode(true);
    // $addButton.style.display = "inherit";
    // $addButton.addEventListener("click", function() {console.log("add")});
    // // this.$addButton.oncontextmenu = false;

    // // Delete button
    // let $deleteButton = $("context-menu-delete-button").cloneNode(true);
    // $deleteButton.style.display = "inherit";
    // $deleteButton.addEventListener("click", function() {console.log("delete")});

    // // Append buttons to context menu
    // $contextMenu.appendChild($addButton);
    // $contextMenu.appendChild($deleteButton);
    // $("context-menu-container").appendChild($contextMenu);

    // $contextMenu.style.left = e.clientX - this.offsetX + "px";
    // $contextMenu.style.top = e.clientY - this.offsetY + "px";
    // $contextMenu.style.display = "flex";
  };


}