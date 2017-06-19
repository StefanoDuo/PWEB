/* 
 * tileIds: object containing the IDs of the tiles the sketcher needs to create
 * whereToDraw: the id of the element that will contain the tiles
 * tileBaseClass: will be added to the css class of every tile
 * 
 * 
 *	DEPENDENCIES: none
 */

function ForegroundSketcher(tileID, whereToDraw, tileBaseClass, initialPosition, tileMarginSize, tileBoxSize, xOffset, yOffset, rowNumber, columnNumber) {
   this.baseClass = tileBaseClass;
   this.marginSize = tileMarginSize;
   this.boxSize = tileBoxSize;
   this.xOffset = xOffset;
   this.yOffset = yOffset;
   this.rowNumber = rowNumber;
   this.columnNumber = columnNumber;
   this.startingPosition = initialPosition || {
      'top': this.marginSize,
      'left': this.marginSize
   };
   this.position = null;
   this.whereToDraw = document.getElementById(whereToDraw);
   this.tile = document.createElement('div');
   this.tile.id = tileID;
   this.tile.className = this.baseClass;
   this.whereToDraw.appendChild(this.tile);

   this.initialize();
}

ForegroundSketcher.prototype.initialize = function() {
   this.position = this.startingPosition;
   this.draw();
}

ForegroundSketcher.prototype.setPosition = function(position) {
   // var whichRow = Math.floor(position / this.columnNumber);
   // var whichColumn = position % this.columnNumber;
   this.position.top = position.y * (this.marginSize * 2 + this.boxSize) + this.yOffset;
   this.position.left = position.x * (this.marginSize * 2 + this.boxSize) + this.xOffset;
   this.draw();
}

ForegroundSketcher.prototype.draw = function() {
   this.tile.style.top = this.position.top + 'px';
   this.tile.style.left = this.position.left + 'px';
}