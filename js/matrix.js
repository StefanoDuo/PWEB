function Matrix(rowNumber, columnNumber) {
   this.rowNumber = rowNumber;
   this.columnNumber = columnNumber;

   this.matrix = new Array(rowNumber);

   for(var i = 0; i < rowNumber; i++)
      this.matrix[i] = new Array(columnNumber);
}

Matrix.prototype.reset = function() {
   for(var i = 0; i < this.columnNumber; i++)
      for(var j = 0; j < this.rowNumber; j++)
         this.matrix[i][j] = null;
}
      
Matrix.prototype.belongsToMatrix = function(vector) {
   return (vector.y >= 0 && vector.y < this.rowNumber && vector.x >= 0 && vector.x < this.columnNumber);
}

Matrix.prototype.getPosition = function(vector) {
   return this.belongsToMatrix(vector) ? this.matrix[vector.y][vector.x] : null;
}

Matrix.prototype.setPosition = function(vector, value) {
   console.log('VECTOR');
   console.log(vector);
   console.log('MATRIX');
   console.log(this.matrix);
   this.matrix[vector.y][vector.x] = value;
}