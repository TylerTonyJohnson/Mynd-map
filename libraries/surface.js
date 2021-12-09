class Surface {
  /**
  * @description Add more attributes to the item.
  * @param {*} item
  * @param {*} key
  * @param {Node} parent
  * */

  constructor(hand, element) {
    this.hand = hand || null;
    this.element = element || null;

    this.root = new Node();
  }

  // Render function
  render = () => {

    // Prepare for rendering

    // Render
    this.element.textContent = JSON.stringify(this.hand.pearl.grains,null,2);
  }

  

  // Convert to HTML
}

class Node {

  constructor() {
    this.key = null;
    this.value = null;
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