function Vector2D(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

// Instance methods
Vector2D.prototype = {
  add: function (v) {
    if (v instanceof Vector2D) {
      return new Vector2D(this.x + v.x, this.y + v.y);
    } else {
      return new Vector2D(this.x + v, this.y + v);
    }
  },

  multiply: function (v) {
    if (v instanceof Vector2D) {
      return new Vector2D(this.x * v.x, this.y * v.y);
    } else {
      return new Vector2D(this.x * v, this.y * v);
    }
  },

  divide: function (v) {
    if (v instanceof Vector2D) {
      return new Vector2D(this.x / v.x, this.y / v.y);
    } else {
      return new Vector2D(this.x / v, this.y / v);
    }
  },

  dot: function (v) {
    return this.x * v.x + this.y * v.y;
  },

  length: function () {
    return Math.sqrt(this.dot(this));
  },

  unit: function () {
    return this.divide(this.length());
  },
};

// Static methods
