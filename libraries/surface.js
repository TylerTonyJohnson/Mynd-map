const expandedCaretName = "arrow_drop_down";
const collapsedCaretName = "arrow_right";

class Surface {
  /**
  * @description A primitive pearl renderer - JSON format
  * */

  constructor(target, element) {
    this.target = target || null;
    this.lattice = new Lattice(this.target, this);
    this.highlighted = [];
    this.selected = [];
    this.$ContextMenu = null;
    this.$Element = element || null;

    // Document setup
    document.oncontextmenu = e => e.preventDefault();
    document.onclick = e => {
      if (this.highlighted.length > 0) {
        this.clearHighlightList();
      }
      if (this.$ContextMenu) {
        this.$ContextMenu.clear();
      }
    }
  }

// ---------- RENDERING ----------

  // Render function
  render = () => {

    // Clear the element to be rendered into
    this.$Element.innerHTML = "";
    
    // Render
    this.$Element.appendChild(this.lattice.$Render());
  }

// ---------- HIGHLIGHTING ----------

  // Add a node to the list of nodes to keep highlighted
  addToHighlightList = (element) => {
    // Add this node to the list
    this.highlighted.push(element);
    // Make the style highlighted
    if (!element.classList.contains("highlighted")) {
      element.classList.add("highlighted");
    }
  }

  // Remove a node from the list of nodes to keep highlighted
  removeFromHighlightList = (element) => {

    // Find and remove element from the highlight list
    let index = this.highlighted.indexOf(element);
    if (index) {
      this.highlighted.splice(index, 1);
    }

    // Remove the highlighting from the element
    element.classList.remove("highlighted");
  }

  clearHighlightList = () => {
    this.highlighted.forEach(element => {
      element.classList.remove("highlighted");
    });
    this.highlighted = [];
  }
}

class Lattice {
  /**
  * @description A collection of structured crystals
  * */

  constructor (target, surface) {
    // console.log(target);
    this.target = target;
    this.surface = surface;                 // Get parent
    
    // Crystal organization
    this.crystals = [];
    this.depth = 0;
    this.$Element = null;

    // Child stuff
    this.nucleus = new Crystal(this.target, this);
    this.nucleus.surface = this.surface;
    this.nucleus.lattice = this;
    this.crystals.push(this.nucleus);
  }

  $Render = () => {

    // Set up container for rendering inside
    this.$Element = $Create(`
      <div id="crystal-container"></div>
    `);

    // Recursively go through child nodes and render to complete whole render
    this.$Element.appendChild(this.nucleus.$Render());
    return this.$Element;
  } 
}

class Crystal {
  /**
  * @description A single node in an information system viewer
  * */

  // Right now, this only supports arrays, objects, strings, numbers, booleans

  constructor(target, parent = null) {

    console.log("Constructing new Crystal")
    console.log(target);
    // Make sure target exists
    if (target == null) return;

    // Figure out what kind of crystal this will be
    switch (typeof target) {
      case ("object"):
      console.log("I am an object");
      break;
    case ("array"):
      console.log("I am an array");
      break;
    case ("string"):
      console.log("I am a string");
      break;
    case ("number"):
      console.log("I am a number");
      break;
    case ("boolean"):
      console.log("I am a boolean");
      break;
    default:
      console.log("I am something else, a " + typeof(target));
      this.value = target;
      break;
    }
    this.target = target;
    this.type = typeof target;

    // Parent stuff
    this.parent = parent;              // If the parent is a lattice, that means this is a root node
    console.log((this.parent.constructor.name === "Lattice") ? "I am a nucleus" : "I am not a nucleus");
    this.surface = parent.surface;     // Convenient handle to surface
    this.lattice = parent.lattice;
    this.depth = this.parent.depth + 1;
    console.log("Depth - " + this.parent.depth)
    
    this.$Element = null;
    this.$Children = null;
    this.class = this.constructor.name;
    this.isExpanded = false;
    
    // Generate children
    this.properties = [];
    this.children = [];  
    this.createChildren();
  }
        
  // ---------- Change ----------
  
  // Generate initial child data
  createChildren = (target = this.target) => {
    console.log("creating children")
    for (let key in target) {
      this.children.push(target[key]);
    }
  }

  // Generate HTML for children
  $RenderChildren = (target = this.target) => {

    // Check if children have been populated yet
    if (this.children.length < 1) {
      this.createChildren();
    }
    
    // Clear the rendered children buffer
    this.$Children.innerHTML = "";

    


    // Add children one by one
    this.children.forEach(targetChild => {
      // console.log(targetChild);
      // console.log("creating " + targetChild + " - " + typeof targetChild)
      let child = new Crystal(targetChild, this);
      // console.log(child);
      let $Child = child.$Render();
      this.$Children.appendChild($Child);
      // console.log(this.$Children);
    });

  }

  addChild = (child) => {
    console.log(typeof child);
  }
  
  // Expand
  expand = () => {
    console.log("expanding");
    this.isExpanded = true;
    this.$Element.classList.add("expanded");
    this.$Element.classList.remove("collapsed");
    this.$RenderChildren();
    this.$Children.classList.remove("hide");
  }
  
  // Collapse
  collapse = () => {
    console.log("collapsing");
    this.isExpanded = false;
    this.$Element.classList.add("collapsed");
    this.$Element.classList.remove("expanded");
    this.$Children.classList.add("hide");
  }
  
  // Toggle expand/collapse
  toggle = (e) => {
    console.log("toggling");
    if (this.isExpanded === false) {
      this.expand();
    } else {
      this.collapse();
    }
  }
  
  // ---------- Rendering ----------
  
  // Create HTML node with events for this node line
  $Render = () => {
    
    // Caret > Label > spacer > value

    // Create main contaner for node line
    let $CrystalContainer = $Create(`<div class="crystal-container"></div>`);
    let $ContentContainer = $Create(`<div class="crystal-line"></div>`);
    let $ChildContainer = $Create(`<div class="crystal-child"></div>`);

    $CrystalContainer.appendChild($ContentContainer);
    $CrystalContainer.appendChild($ChildContainer);

    // Create caret element in node line
    let $Caret = this.createCaret();
    $ContentContainer.appendChild($Caret);
    // Left click caret function
    $Caret.onclick = e => {
      e.stopPropagation();
      this.toggle(e);
      // this.surface.addToHighlightList($Caret);
    };
    
    // Right click caret function 
    $Caret.oncontextmenu = e => {
      e.preventDefault();
      e.stopPropagation();
    };
    
    //  Create content in crystal-line
    let $Content = this.createContent();
    $ContentContainer.appendChild($Content);

    $Create(`
    <div id="toaster" class="node-container">
    <div class="node-key">${this.class}</div>
    <div class="node-spacer">:</div>
    <div class="node-value">${this.value}</div>
    <div class="node-size">
    ${this.children.length > 0 ? "{" + this.children.length + "}" : ""}
    </div>
    </div>
    `);
    
    // Left click label function
    $Content.onclick = e => {
      e.stopPropagation();
      console.log("Left clicked node label")
      this.surface.addToHighlightList($Content);
    };
    
    // Right click label function
    $Content.oncontextmenu = e => {
      console.log("Right clicked node label")
      this.surface.addToHighlightList($Content);
      this.surface.$ContextMenu = new ContextMenu(e, this);
    };
    
    // Build element out of parts and return


    // $CrystalContainer.appendChild($Caret);
    // $CrystalContainer.appendChild($Content);
    this.$Element = $CrystalContainer;
    this.$Children = $ChildContainer;
    return this.$Element;
  }

  createCaret = () => {
    return $Create(`
    <div class="caret-icon">
      <i class="material-icons">${
        this.isExpanded ? expandedCaretName : collapsedCaretName
      }</i>
    </div>`);
  }

  createSpacer = () => {
    return ($Create(`<div class="node-spacer">:</div>`));
  }

  // Create the content of the exported HTML rendered
  createContent = () => {

    // Create container
    let $Content;

    // Figure out what kind of content it should have
    console.log(this.type)
    switch (this.type) {
      case ("object"):
        console.log("I am an object");
        $Content = $Create(`
          <div class="crystal-content">
            <div class="node-key">${this.type}</div>
            <div class="node-size">
            ${this.children.length > 0 ? "{" + this.children.length + "}" : ""}
            </div>
          </div>
        `);
        break;
      case ("array"):
        console.log("I am an array");
        $Content = $Create(`
          <div class="crystal-content">
            <div class="node-key">${this.type}</div>
            <div>ARRAY</div>
          </div>
        `);
        break;
      case ("string"):
        console.log("I am a string");
        $Content = $Create(`
          <div class="crystal-content">
            <div class="node-key">${this.type}</div>
            <div>STRING</div>
          </div>
        `);
        break;
      case ("number"):
        console.log("I am a number");
        $Content = $Create(`
          <div class="crystal-content">
            <div class="node-key">${this.type}</div>
            <div>NUMBER</div>
          </div>
        `);
        break;
      case ("boolean"):
        console.log("I am a boolean");
        $Content = $Create(`
          <div class="crystal-content">
            <div class="node-key">${this.type}</div>
            <div>BOOLEAN</div>
          </div>
        `);
        break;
      default:
        console.log("I am something else, a " + typeof target);
        $Content = $Create(`
          <div>DEFAULT<div>
        `);
        break;
    }

    console.log($Content)
    return $Content;
  }

// Context Menu
  static contextMenuLayout = [
    {
      name: "Add",
      icon: "add",
      // function: this.surface.hand.addGrain
    },{
      name: "Delete",
      icon: "delete",
      // function: this.surface.hand.removeGrain
    }
  ]
}