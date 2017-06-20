/* handles a grid of tiles, allowing to easily modify their classes
 *
 * gridSize: the size of the side of the square
 * whereToDraw: the id of the element that will contain the tiles
 * tileBaseClass: will be added to the css class of every tile
 * backgroundImage: an array cointaining background images applicable to the single tiles
 * chooseBackground: a function which returns a random index of backgroundImage
 *
 * DEPENDENCIES: none
 */

function BackgroundSketcher(gridSize, whereToDraw, tileBaseClass, backgroundImage, chooseBackground) {
   this.whereToDraw = document.getElementById(whereToDraw);
   this.gridSize = gridSize;
   this.tileBaseClass = tileBaseClass;
   this.grid = new Array(this.gridSize);
   this.backgroundImage = backgroundImage;
   this.chooseBackground = chooseBackground;

   for(var i = 0; i < this.gridSize; i++) {
      this.grid[i] = new Array(this.gridSize);
      for(var j = 0; j < this.gridSize; j++) {
         this.grid[i][j] = document.createElement('div');
         this.grid[i][j].id = '' + (i * this.gridSize + j);
         this.whereToDraw.appendChild(this.grid[i][j]);
      }
   }
   this.initialize();
}

BackgroundSketcher.prototype.initialize = function() {
   for(var i = 0; i < this.gridSize; i++)
      for(var j = 0; j < this.gridSize; j++)
         this.grid[i][j].className = this.tileBaseClass;
}

BackgroundSketcher.prototype.drawGrid = function(grid) {
   for(var i = 0; i < this.gridSize; i++)
      for(var j = 0; j < this.gridSize; j++) {
         var element = grid[i][j];
         this.grid[i][j].className = this.tileBaseClass;
         if(element === 'rock' || element === 'hole')
            this.grid[i][j].className += ' ' + element + 'Gameplay';
         else
            this.grid[i][j].style.backgroundImage = "url('resources/img/" + this.backgroundImage[this.chooseBackground()] + "')";
      }
}

BackgroundSketcher.prototype.drawBoxByCoordinates = function(x, y, cssClass) {
   this.grid[y][x].className = this.tileBaseClass + ' ' + cssClass;
}

BackgroundSketcher.prototype.drawBoxById = function(id, cssClass) {
   var y = Math.floor(id / this.gridSize);
   var x = id % this.gridSize;
   this.drawBoxByCoordinates(x, y, cssClass);
}

BackgroundSketcher.prototype.addClassByCoordinates = function(x, y, cssClass) {
   this.grid[y][x].className += ' ' + cssClass;
}

BackgroundSketcher.prototype.addClassById = function(id, cssClass) {
   var y = Math.floor(id / this.gridSize);
   var x = id % this.gridSize;
   this.addClassByCoordinates(x, y, cssClass);
}

BackgroundSketcher.prototype.getGrid = function() {
   return this.grid;
}