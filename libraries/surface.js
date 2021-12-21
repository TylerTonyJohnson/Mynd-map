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

    // Page document setup
    document.oncontextmenu = e => e.preventDefault();
    document.onclick = e => {
      if (this.highlighted.length > 0) {
        this.clearHighlightList();
      }
      if (this.$ContextMenu) {
        this.clearContextMenu();
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
    // console.log(typeof(target));
    this.target = target;
    this.surface = surface;                 // Get parent
    this.nucleus = new Crystal(this.target, this);
    this.nucleus.lattice = this;            // Two-way binding to parent
    this.nucleus.surface = this.surface;    // Two-way binding to surface

    switch (this.nucleus.type) {
      case "object":
        for (let key of Object.keys(target)) {

          //FIXME: Need to figure out how I'm going to iterate through my objects without including the functions.
          console.log(key + " - " + typeof key);
        }
        break;
      case "array":
        for (let crystal of target) {
          console.log(crystal + " - " + typeof(crystal));
        }
        break;
      default:
        break;
    }
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

  constructor(target, parent = null) {
    this.parent = parent;
    // this.lattice = ?
    switch (typeof(target)) {
      case "object":
        console.log("I am an object");
        this.key = Object.keys(target)[0] || null;
        this.value = Object.values(target)[0] || null;
        break;
      case "array":
        console.log("I am an array");
        break;
      default:
        console.log("I am something else, a " + typeof(target))
        break;
    }
    this.type = typeof(target);
    this.depth = (this.parent) ? this.parent.depth + 1 : 0;
    this.children = [];
    this.$Element = null;
    this.class = this.constructor.name;
    this.isExpanded = false;

    // Context menu configuration
    this.contextMenuLayout = [
      {
        name: "Add",
        icon: "add",
        // function: this.surface.hand.addGrain
      },{
        name: "Delete",
        icon: "delete",
        // function: this.surface.hand.removeGrain
      }
    ];
  }

  // ---------- Change ----------

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

    // Create main contaner for node line
    let $Container = $create(`<div class="node-line"></div>`);

    // Create caret element in node line
    let $Caret = $create(`
      <div class="caret-icon">
      <i class="material-icons">${
        this.isExpanded ? expandedCaretName : collapsedCaretName
      }</i>
      </div>`)

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
      this.surface.removeFromHighlightList($Caret);
    };

    //  Create label in node-line
    let $Label = $create(`
      <div id="toaster" class="node-container">
        <div class="node-key">${this.key}</div>
        <div class="node-spacer">:</div>
        <div class="node-value">${this.value}</div>
        <div class="node-size">${"{4}"}</div>
      </div>
    `);

    // Left click label function
    $Label.onclick = e => {
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
}