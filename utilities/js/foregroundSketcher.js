/* created to easily move absolute positione items on the game grid
 *
 * tileID: ID give to the html element
 * whereToDraw: the id of the element that will contain the tiles
 * tileBaseClass: will be added to the css class of the html element
 * initialPosition: {x, y} object containing the starting coordinates on the grid of the element
 * tileMarginSize, tileBoxSize: needed to correctly position the element
 * xOffset, yOffset: represents the padding of the containing element
 * 
 *	DEPENDENCIES: none
 */

function ForegroundSketcher(tileID, whereToDraw, tileBaseClasses, tileVariableClasses, tileMarginSize, tileBoxSize, xOffset, yOffset, initialPosition) {
   this.tileBaseClasses = tileBaseClasses;
   this.tileVariableClasses = tileVariableClasses
   this.marginSize = tileMarginSize;
   this.boxSize = tileBoxSize;
   this.xOffset = xOffset;
   this.yOffset = yOffset;
   this.startingPosition = initialPosition || {
      'top': this.marginSize,
      'left': this.marginSize
   };
   this.position = null;
   this.whereToDraw = document.getElementById(whereToDraw);
   this.tile = document.createElement('div');
   this.tile.id = tileID;
   this.whereToDraw.appendChild(this.tile);

   this.initialize();
}

ForegroundSketcher.prototype.initialize = function() {
   this.position = this.startingPosition;
   this.lastDirection = 'down';
   this.draw(false);
}

ForegroundSketcher.prototype.setPosition = function(position, direction) {
   this.position.top = position.y * (this.marginSize * 2 + this.boxSize) + this.yOffset;
   this.position.left = position.x * (this.marginSize * 2 + this.boxSize) + this.xOffset;
   this.draw(direction);
}

ForegroundSketcher.prototype.draw = function(direction) {
   if(!direction || direction === 'redo' || direction === 'undo')
      direction = this.lastDirection;
   else
      this.lastDirection = direction;
   this.tile.style.top = this.position.top + 'px';
   this.tile.style.left = this.position.left + 'px';
   this.tile.className = this.tileBaseClasses + ' ' + this.tileVariableClasses[direction];
}