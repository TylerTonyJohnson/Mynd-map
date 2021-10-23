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

  multiply: function (a, b) {
    if (a instanceof Vector2D) {
      return new Vector2D(this.x * a.x, this.y * a.y);
    } else if (Number.isFinite(a) && Number.isFinite(b)) {
      return new Vector2D(this.x * a, this.y * b);
    } else if (Number.isFinite(a)) {
      return new Vector2D(this.x * a, this.y * a);
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
