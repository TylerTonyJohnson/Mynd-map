// The purpose of this is to interact with the data

class Hand {

  constructor (pearl, lens) {
    this.pearl = pearl || null;
    this.lens = lens || null;

    if (localStorage.pearl) {
      this.pearl.grains = JSON.parse(localStorage.pearl);
    } else {
      this.pearl.grains = this.createDefaultPearl();
    }
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

  downloadPearl = () => {
    console.log("Downloading Pearl")
    let exportData = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pearl));
    let $Export = document.createElement("a");
    $Export.setAttribute("href", exportData);
    $Export.setAttribute("download", "pearl.json");
    document.body.appendChild($Export);
    $Export.click();
    $Export.remove();
  }

  // Reset to default
  resetPearl = () => {
    this.pearl.grains = this.createDefaultPearl();
    this.render();
  }

  // ---------- View Functions (Rendering) ----------

  // Render the pearl to be visible to the user
  render = () => {

    // Renderer 1
    let tree = JsonView.createTree(this.pearl);
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

  // ---------- Defaults ----------

  createDefaultPearl() {

    let defaultPearl = [];
    for (let i = 0; i < 3; i++) {
      defaultPearl.push(new Idea());
    }
    return defaultPearl; 
  }
}