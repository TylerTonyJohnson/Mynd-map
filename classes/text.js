class Text {

  isDebug = false;

  // Font size
  font = "Trebuchet MS";
  fontSize = 24; // in pixels
  fontColor = "white";
  textAlignment = "center";
  textBaseline = "middle";

  constructor(x, y, width = 50, height = 20) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  update = (x, y) => {
    this.x = x;
    this.y = y;
  }

  render = (ctx) => {
    


    // Draw text



    // Draw border box if in debug mode
  };


}