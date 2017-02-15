/* interface between game logic and the browser where everything is
 * displayed, the first number in the matrix notations represents
 * the y axis the second number the x axis
 *
 * DEPENDENCIES: none
 */

function Sketcher(gridSize, whereToDraw, boxClass) {
   this.whereToDraw = document.getElementById(whereToDraw);
   this.gridSize = gridSize;
   this.boxClass = boxClass

   this.initialize();
}

Sketcher.prototype.initialize = function() {
   this.grid = new Array(this.gridSize);
   for(var i = 0; i < this.gridSize; i++) {
      this.grid[i] = new Array(this.gridSize);
      for(var j = 0; j < this.gridSize; j++) {
         this.grid[i][j] = document.createElement('div');
         this.grid[i][j].id = '' + (i * 10 + j);
         this.grid[i][j].className = this.boxClass;
         this.whereToDraw.appendChild(this.grid[i][j]);
      }
   }
}

Sketcher.prototype.drawGrid = function(grid) {
   for(var i = 0; i < this.gridSize; i++) {
      for(var j = 0; j < this.gridSize; j++) {
         this.grid[i][j].className = this.boxClass + ' ' + grid[i][j];
      }
   }
}

Sketcher.prototype.drawBoxByCoordinates = function(x, y, cssClass) {
   this.grid[y][x].className = this.boxClass + ' ' + cssClass;
}

Sketcher.prototype.drawBoxById = function(id, cssClass) {
   var y = Math.floor(id / this.gridSize);
   var x = id % this.gridSize;
   this.drawBoxByCoordinates(x, y, cssClass);
}

Sketcher.prototype.getGrid = function() {
   return this.grid;
}

/* parses every element in the grid searching for the contained objects
 * returns an object composed as follows: {
      'player' : Vector object,
      'ball' : Vector object,
      'hole' : Vector object'
      'rocks' : array of Vector objects
   }
 *    
 */