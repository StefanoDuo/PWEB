//contains the game logic
//requires Vector object

function Game(gameFieldSize, playerPosition, ballPosition, holePosition, rocksPositions) {
   //initialization of the 2d matrix representing the game field
   this.gameFieldSize = gameFieldSize;
   this.gameField = new Array(gameFieldSize);

   for(var i = 0; i < gameFieldSize; i++) {
      this.gameField[i] = new Array(gameFieldSize);
      for(var j = 0; j < gameFieldSize; j++) {
         //initialize all location with NULL (empty space)
         this.gameField[i][j] = null;
      }
   }

   //positioning player, ball, hole and rocks accordingly to parameters
   this.gameField[playerPosition.y][playerPosition.x] = 'player';
   this.gameField[ballPosition.y][ballPosition.x] = 'ball';
   this.gameField[holePosition.y][holePosition.x] = 'hole';
   rocksPositions.forEach(function(element) {
      this.gameField[element.y][element.x] = 'rock';
   }.bind(this));

   //storing player and ball positions for fast access during updates
   this.playerPosition = new Vector(playerPosition.x, playerPosition.y);
   this.ballPosition = new Vector(ballPosition.x, ballPosition.y);
}

Game.prototype.getGrid = function() {
   return this.gameField;
}

Game.prototype.isExitingGrid = function(direction) {
   var newPosition = this.playerPosition.add(direction);
   return !newPosition.belongsToSquare(this.gameFieldSize - 1);
}

Game.prototype.isHittingRock = function(direction) {
   var newPosition = this.playerPosition.add(direction);
   if(this.gameField[newPosition.y][newPosition.x] === 'rock')
      return true;
   else
      return false;
}

Game.prototype.movePlayer = function(direction) {
   //first checks if the player is falling off the grid, otherwise
   //isHittingRocks might check non allocated location of the array
   if(this.isExitingGrid(direction) || this.isHittingRock(direction))
      return;

   var newPosition = this.playerPosition.add(direction);
   this.gameField[this.playerPosition.y][this.playerPosition.x] = null;
   this.playerPosition = newPosition;
   this.gameField[newPosition.y][newPosition.x] = 'player';
}