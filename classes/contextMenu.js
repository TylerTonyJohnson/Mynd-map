const minFadeThresh = 150;
const maxFadeThresh = 300;

class ContextMenu {

  constructor(event, target) {
    ContextMenu.clear(lens);
    this.event = event;
    this.target = target;
    this.$Element = this.create(event, target);
  }

// ----------MAIN FUNCTIONS ---------- 

  // Create function
  create = (event, target) => {

    // Build container for context menu
    let $ContextMenu = $Create(`
      <div id="context-menu" class="context-menu"></div>
    `);

    // Construct items inside context menu
    let $AddButton = $Create(`
    <div id="context-menu-add-button" class="context-menu-button">
      <span class="material-icons context-menu-button-component"> add </span>
      <div class="context-menu-button-component">Add</div>
    </div>
    `);
    $AddButton.style.display = "inherit";
    $AddButton.onclick = function(event) {
      hand.addGrain();
      $("context-menu-container").innerHTML = "";
    }

    let $DeleteButton = $Create(`
    <div id="context-menu-delete-button" class="context-menu-button">
      <span class="material-icons context-menu-button-component"> delete </span>
      <div class="context-menu-button-component">Delete</div>
    </div>
    `);
    $DeleteButton.style.display = "inherit";
    $DeleteButton.onclick = hand.removeGrain;

    // Construct context menu heirarchy
    $ContextMenu.appendChild($AddButton);
    $ContextMenu.appendChild($DeleteButton);
    $("context-menu-container").appendChild($ContextMenu);
    $ContextMenu.style.visibility = "visible";

    // Configure
    switch (target.constructor.name) {
      case "Crystal":
      case "Grain":
      default:
        $ContextMenu.style.left = event.clientX + "px";
        $ContextMenu.style.top = event.clientY + "px";
        break;
    }

    // Fading functionality
    document.addEventListener("mousemove", this.trackFocus);

    // Return value
    return $ContextMenu;
  }

  // Clear function
  clear = () => {
    console.log("clearing context menu");
    document.removeEventListener("mousemove", this.trackFocus);
    this.$Element.remove();
    lens.$ContextMenu = null;
  }

  // Static clear function
  static clear = (targetLens) => {
    let clearLens = targetLens || lens;
    document.removeEventListener("mousemove", this.trackFocus);
    if (clearLens.$ContextMenu) {
      clearLens.$ContextMenu.$Element.remove();
      clearLens.$ContextMenu = null;
    }
  }

  // Track mouse until context menu goes away.
  trackFocus = (event) => {
      // console.log(event.x + " " + event.y);
      let dist = getDistFromElem(event, this.$Element);
      let fadePercent = (dist - minFadeThresh) / (maxFadeThresh - minFadeThresh);

      switch (true) {
        case (dist > maxFadeThresh):
                // console.log("Greater")
          this.clear();
          break;
        case (dist < minFadeThresh):
                // console.log("Lesser")
          break;
        case (dist >= minFadeThresh && dist <= maxFadeThresh):
                // console.log("Fading" + this.$Element.style.opacity);
          this.$Element.style.opacity = (1 - fadePercent);
          break;
        default:
                console.log("Something is wrong");
      }
  }
}