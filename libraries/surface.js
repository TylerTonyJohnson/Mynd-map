const expandedCaretName = "arrow_drop_down";
const collapsedCaretName = "arrow_right";

class Surface {
  /**
  * @description A primitive pearl renderer - JSON format
  * */

  static get expandedCaret() {
    return expandedCaretName;
  }

  static get collapsedCaret() {
    return collapsedCaretName;
  }

  constructor(target, element) {
    this.target = target || null;
    this.$element = element || null;
    this.lattice = new Lattice(this.target);
  }

  // Render function
  render = () => {
    // Make a title to go above the surface
    this.$element.innerHTML = `<div class="surface-container">PEARL</div>`;
    
    // Render
    this.$element.appendChild(this.lattice.render());
  }
}

class Lattice {
  /**
  * @description A collection of structured crystals
  * */

  constructor (target) {
    // console.log(typeof(target));
    this.nucleus = new Crystal(target);

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


  render = () => {
    // Recursively go through child nodes and render to complete whole render
    
    let result = this.nucleus.render();
    return result;
  } 
}

class Crystal {
  /**
  * @description A single node in an information system viewer
  * */

  constructor(target, parent = null) {

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
    this.isExpanded = false;
    this.parent = parent;
    this.depth = (this.parent) ? this.parent.depth + 1 : 0;
    this.children = [];
    this.$Element = null;
    this.class = this.constructor.name;
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
  toggle = () => {
    if (this.isExpanded === false) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  // ---------- Rendering ----------

  // Create HTML node with events for this node line
  render = () => {

    // Create main contaner for node line
    let $Container = $create(`<div class="node-line"></div>`);

    // Create caret element in node line
    let $Caret = $create(`
      <div class="caret-icon">
      <i class="material-icons">${
        this.isExpanded ? Surface.expandedCaret : Surface.collapsedCaret
      }</i>
      </div>`)
    $Caret.onclick = this.toggle;

    //  Create label in node-line
    let $Label = $create(`
      <div class="node-container">
        <div class="node-key">${this.key}</div>
        <div class="node-spacer">:</div>
        <div class="node-value">${this.value}</div>
        <div class="node-size">${"{4}"}</div>
      </div>
    `);
    $Label.onclick = function() {alert("Clicked!")};

    // Create the node line out of elements
    $Container.appendChild($Caret);
    $Container.appendChild($Label);

    this.$Element = $Container;
    return this.$Element;
  }
}