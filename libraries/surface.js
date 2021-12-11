class Surface {
  /**
  * @description A primitive pearl renderer - JSON format
  * */

  constructor(target, element) {
    this.target = target || null;
    this.element = element || null;
    this.lattice = new Lattice(this.target);
  }

  // Render function
  render = () => {

    // Render
    this.element.innerHTML = this.lattice.render();
    // this.element.textContent = JSON.stringify(this.hand.pearl.grains,null,2);
  }

  // Convert to HTML
}

class Lattice {
  /**
  * @description A collection of structured crystals
  * */
  constructor (target) {
    console.log(target)
    this.nucleus = new Crystal(target);
    this.name = "Charles";
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

  constructor(target) {
    this.key = Object.keys(target)[0] || null;
    this.value = Object.values(target)[0] || null;
    this.name = target.name;
    this.isExpanded = false;
    this.parent = null;
    this.children = null;
    this.type = typeof(target);
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
    let element = `
    <div class="node-line">
      <div class="caret-icon">
        <i class="material-icons">arrow_drop_down</i>
      </div>
      <div class="node-container">
        <div class="node-key">${this.key}</div>
        <div class="node-spacer">:</div>
        <div class="node-value">${this.value}</div>
        <div class="node-size">${"{4}"}</div>
      </div>
    </div>`;

    return element;
  }

}