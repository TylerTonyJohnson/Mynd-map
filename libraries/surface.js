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

    this.root = new Node(element);
    console.log(this.root);
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
  static expand = () => {

    this.isExpanded = true;
  }

  // Collapse
  static collapse = () => {

    this.isExpanded = false;
  }

  // Toggle expand/collapse
  static toggle = () => {
    if (this.isExpanded === false) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  // ---------- Rendering ----------

  // Render to HTML
   static render = () => {

  }

}

// Create node function