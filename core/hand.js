// The purpose of this is to interact with the data

class Hand {
  pearl = null;

  constructor () {
    console.log("Making hand");
  }

  // Set pearl function
  setPearl = (pearl) => {
    this.pearl = pearl;
  }


  // Update lens

  // Update pearl

  // ---------- Pearl modification functions ----------  

  addGrain = (grain) => {
    this.pearl.grains.push(grain);
  }

  // ---------- Interaction Events ----------

}