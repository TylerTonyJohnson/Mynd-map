class Surface {
  /**
  * @description A primitive pearl renderer - JSON format
  * */

  constructor(target, element) {
    this.target = target || null;
    this.element = element || null;
  }

  // Render function
  render = () => {

    // Prepare for rendering
    let lattice = new Lattice(this.target);
    

    // Render
    this.element.textContent = typeof(this.target);
    // this.element.textContent = JSON.stringify(this.hand.pearl.grains,null,2);
  }

  

  // Convert to HTML
}

class Lattice {
    /**
  * @description A collection of structured crystals
  * @param {*} item
  * @param {*} key
  * @param {Node} parent
  * */
  constructor (target) {
    this.nucleus = null;
  }

}

class Crystal {
    /**
  * @description A single node in an information system viewer
  * @param {*} item
  * @param {*} key
  * @param {Node} parent
  * */

  constructor(object) {
    this.key = object.key || null;
    this.value = object.value || null;
    this.parent = null;
    this.children = null;
    this.isExpanded = false;
    this.type = null;
    this.element = null;
  }

  // ---------- Change ----------

  // Expand
  expand = () => {

    this.isExpanded = true;
  }

  // Collapse
  collapse = () => {

    this.isExpanded = false;
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

  // Render to HTML
  render = () => {

  }

}

// Create node function