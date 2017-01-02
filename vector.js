//used to simplify player movements arithmetic

function Vector(x, y) {
   this.x = Math.round(x);
   this.y = Math.round(y);
}

Vector.prototype.scalarMultiplication = function(scalar) {
   return new Vector(this.x * scalar, this.y * scalar);
}

Vector.prototype.add = function(vector) {
   return new Vector(this.x + vector.x, this.y + vector.y);
}

Vector.prototype.subtract = function(vector) {
   return this.add(vector.scalarMultiplication(-1));
}

Vector.prototype.belongsToFirstQuadrant = function() {
   if(this.x >= 0 && this.y >= 0)
      return true;
   else
      return false;
}

Vector.prototype.belongsToSquare = function(sideSize) {
   if(this.belongsToFirstQuadrant() && this.x <= sideSize && this.y <= sideSize)
      return true;
   else
      return false;
}