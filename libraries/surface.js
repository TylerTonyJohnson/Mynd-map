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
    this.$Element.appendChild(this.lattice.$render());
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
    this.nucleus = new Crystal(this.target, this);
    this.nucleus.lattice = this;            // Two-way binding to parent

    // switch (this.nucleus.type) {
    //   case "object":
    //     for (let key of Object.keys(target)) {

    //       //FIXME: Need to figure out how I'm going to iterate through my objects without including the functions.
    //       console.log(key + " - " + typeof key);
    //     }
    //     break;
    //   case "array":
    //     for (let crystal of target) {
    //       console.log(crystal + " - " + typeof(crystal));
    //     }
    //     break;
    //   default:
    //     break;
    // }
    this.name = "Charles";
    this.crystals = [];

  }

  $render = () => {

    // Create header to represent lattice
    

    // Recursively go through child nodes and render to complete whole render
    let result = this.nucleus.$render();
    return result;
  } 
}

class Crystal {
  /**
  * @description A single node in an information system viewer
  * */

  // Right now, this only supports arrays, objects, strings, numbers, booleans

 constructor(target, parent = null) {
   this.parent = parent;              // If the parent is a lattice, that means this is a root node
   this.surface = parent.surface;     // Convenient handle to surface
   
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

    this.type = typeof(target);
    this.depth = (this.parent) ? this.parent.depth + 1 : 0;
    this.$Element = null;
    this.class = this.constructor.name;
    this.isExpanded = false;
    
    // Generate children
    this.properties = [];
    this.children = [];
    // this.populateChildren(target);
          
  }
        
  // ---------- Change ----------
  
  // Fill in the references to all the children of this crystal
  populateChildren = (target) => {
    // console.log(target)
    for (let property in target) {
      console.log(typeof target[property] + " - " + target[property]);

      switch (true) {
        case (typeof target[property] === "object"):
          this.children.push(property);
          console.log("added property to child list");
          break;
        case (Array.isArray(target[property])):
          this.children.push(property)
          console.log("Added this property to child list")
          break;
        case (typeof target[property] === "string"):
          this.properties.push(property)
          console.log("Added this to property list");
          break;
        default:
          console.log("Didn't know what to do with this")
          break;
      }


    }
  }

  addChild = (child) => {
    console.log(typeof child);
  }
  
  // Expand
  expand = () => {
    this.isExpanded = true;
    this.$Element.classList.add("expanded");
    this.$Element.classList.remove("collapsed");
  }
  
  // Collapse
  collapse = () => {
    this.isExpanded = false;
    this.$Element.classList.add("collapsed");
    this.$Element.classList.remove("expanded");
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
  $render = () => {
    
    // Caret > Label > spacer > value

    // Create main contaner for node line
    let $Container = $create(`<div class="node-line"></div>`);
    
    // Create caret element in node line
    let $Caret = this.createCaret();
    
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
    
    //  Create label in node-line
    let $Label = $create(`
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
    $Label.onclick = e => {
      e.stopPropagation();
      console.log("Left clicked node label")
      this.surface.addToHighlightList($Label);
    };
    
    // Right click label function
    $Label.oncontextmenu = e => {
      console.log("Right clicked node label")
      this.surface.addToHighlightList($Label);
      this.surface.$ContextMenu = new ContextMenu(e, this);
    };
    
    // Build element out of parts and return
    $Container.appendChild($Caret);
    $Container.appendChild($Label);
    this.$Element = $Container;
    return this.$Element;
  }

  createCaret = () => {
    return ($create(`
    <div class="caret-icon">
      <i class="material-icons">${
        this.isExpanded ? expandedCaretName : collapsedCaretName
      }</i>
    </div>`));
  }

  createSpacer = () => {
    return ($create(`<div class="node-spacer">:</div>`));
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