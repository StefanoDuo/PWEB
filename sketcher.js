/* interface between game logic and the browser where everything is
 * displayed, the first number in the matrix notations represents
 * the y axis the second number the x axis
 *
 * TODO: 1) switch to an initialization method which draws the entire grid
         2) create another method just to update it switching the contents
            of the player (or ball) next block with his current one
         3) create method to do something upon reaching the hole or hitting
            a wall or rock
         4) make it so the Sketcher object can be used to create level as well
            a good way to accomplish this is by adding a method which returns the
            grid of elements so another object can manage the events on the grid
            boxes (the events will call the drawBox method)
 */

function Sketcher(gridSize, whereToDraw) {
   this.whereToDraw = document.getElementById(whereToDraw);
   this.gridSize = gridSize;

   this.initialize();
}

Sketcher.prototype.initialize = function() {
   this.grid = new Array(this.gridSize);
   for(var i = 0; i < this.gridSize; i++) {
      this.grid[i] = new Array(this.gridSize);
      for(var j = 0; j < this.gridSize; j++) {
         this.grid[i][j] = document.createElement('div');
         this.grid[i][j].id = '' + (i * 10 + j);
         this.grid[i][j].className = 'box';
         if(j === 0)
            this.grid[i][j].className += ' firstOfRow';
         this.whereToDraw.appendChild(this.grid[i][j]);
      }
   }
}

Sketcher.prototype.drawGrid = function(grid) {
   for(var i = 0; i < this.gridSize; i++) {
      for(var j = 0; j < this.gridSize; j++) {
         this.grid[i][j].className = 'box ' + grid[i][j];
         if(j === 0)
            this.grid[i][j].className += ' firstOfRow';
      }
   }
}

Sketcher.prototype.drawBoxByCoordinates = function(x, y, cssClass) {
   if(x === 0) cssClass += ' firstOfRow';
   this.grid[y][x].className = 'box' + cssClass;
}

Sketcher.prototype.drawBoxById = function(id, cssClass) {
   var y = Math.floor(id / this.gridSize);
   var x = id % this.gridSize;
   this.drawBoxByCoordinates(x, y, cssClass);
}

Sketcher.prototype.getGrid = function() {
   return this.grid;
}