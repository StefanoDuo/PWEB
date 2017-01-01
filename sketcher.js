/* interface between game logic and the browser where everything is
 * displayed, the first number in the matrix notations represents
 * the y axis the second number the x axis
 */

function Sketcher(gameFieldSize, whereToDraw) {
   this.whereToDraw = document.getElementById(whereToDraw);
   this.gameFieldSize = gameFieldSize;
   this.gameField = new Array(gameFieldSize);


   //draws the grid and saves references to the elements
   for(var i = 0; i < gameFieldSize; i++) {
      this.gameField[i] = new Array(gameFieldSize);
      for(var j = 0; j < gameFieldSize; j++) {
         this.gameField[i][j] = document.createElement('div');
         this.gameField[i][j].id = '' + (i * 10 + j);
         this.gameField[i][j].className = 'box';
         if(j === 0)
            this.gameField[i][j].className += ' firstOfRow';
         this.whereToDraw.appendChild(this.gameField[i][j]);
      }
   }
}

Sketcher.prototype.draw = function(grid) {
   for(var i = 0; i < this.gameFieldSize; i++) {
      for(var j = 0; j < this.gameFieldSize; j++) {
         this.gameField[i][j].className = 'box ' + grid[i][j];
         if(j === 0)
            this.gameField[i][j].className += ' firstOfRow';
      }
   }
}