/* contains the game logic
 *
 * DEPENDENCIES: Vector, Matrix objects
 *
 * TODO: 2) create status object to send minimal information to the Sketcher object
 *       3) create button to start the setInterval and event to stop it
 *       4) let the player move while the ball is moving (always move the ball first
 *          to avoid strange behaviour)
 */

function Game(matrix, playerPosition, ballPosition, holePosition, rocksPositions, ballMovingDirection) {
   this.startingValues = {
      'playerPosition': playerPosition,
      'ballPosition': ballPosition,
      'holePosition': holePosition,
      'rocksPositions': rocksPositions,
      'ballMovingDirection': ballMovingDirection
   };
   this.gameField = matrix;
   this.initialize();
}


Game.prototype.initialize = function() {
   //positioning player, ball, hole and rocks accordingly to parameters
   this.gameField.reset();
   this.gameField.setPosition(this.startingValues.playerPosition, 'player');
   this.gameField.setPosition(this.startingValues.ballPosition, 'ball');
   this.gameField.setPosition(this.startingValues.holePosition, 'hole');
   this.startingValues.rocksPositions.forEach(function(element) {
      this.gameField.setPosition(element, 'rock');
   }.bind(this));

   //storing player and ball positions for fast access during updates
   this.playerPosition = this.startingValues.playerPosition;
   this.ballPosition = this.startingValues.ballPosition;
   this.ballMovingDirection = this.startingValues.ballMovingDirection;

   this.intervalID = null;
   this.movesNumber = 0;
   this.status = {
      hasHitWall: false,
      hasHitHole: false,
      hasHitRock: false
   };
}


Game.prototype.resetStatus = function() {
   this.status.hasHitWall = false;
   this.status.hasHitHole = false;
   this.status.hasHitRock = false;
}

Game.prototype.getGrid = function() {
   return this.gameField.matrix;
}


//collision check functions
Game.prototype.isOutOfBounds = function(entity, direction) {
   var newPosition = (entity === 'player') ? this.playerPosition : this.ballPosition;
   newPosition = newPosition.add(direction);

   return !newPosition.belongsToSquare(this.gameField.rowNumber - 1);
}

Game.prototype.isPlayerOutOfBounds = function(direction) {
   return this.isOutOfBounds('player', direction);
}

Game.prototype.isBallOutOfBounds = function() {
   return this.isOutOfBounds('ball', this.ballMovingDirection);
}


//checks if entity after moving towards direction has hit object
Game.prototype.isColliding = function(entity, direction, collidingWith) {
   var newPosition = (entity === 'player') ? this.playerPosition : this.ballPosition;
   newPosition = newPosition.add(direction);
   return this.gameField.getPosition(newPosition) === collidingWith;
}

Game.prototype.isPlayerHittingRock = function(direction) {
   return this.isColliding('player', direction, 'rock');
}

Game.prototype.isPlayerHittingBall = function(direction) {
   return this.isColliding('player', direction, 'ball');
}

Game.prototype.isBallHittingRock = function() {
   return this.isColliding('ball', this.ballMovingDirection, 'rock');
}

Game.prototype.isBallHittingHole = function() {
   return this.isColliding('ball', this.ballMovingDirection, 'hole');
}

Game.prototype.isBallMoving = function() {
   return !(this.ballMovingDirection.isNull());
}


Game.prototype.moveBall = function() {
   if(this.isBallHittingHole()) {
      this.status.hasHitHole = true;
      window.clearInterval(this.intervalID);
   }

   if(this.isBallOutOfBounds() || this.isBallHittingRock()) {
      this.ballMovingDirection = this.ballMovingDirection.scalarMultiplication(0);
      if(this.isBallOutOfBounds()) this.status.hasHitWall = true;
      if(this.isBallHittingRock()) this.status.hasHitRock = true;
      return;
   }

   this.gameField.setPosition(this.ballPosition, null);
   this.ballPosition = this.ballPosition.add(this.ballMovingDirection);
   this.gameField.setPosition(this.ballPosition, 'ball');
}

Game.prototype.movePlayer = function(direction) {
   if(this.isPlayerOutOfBounds(direction) || this.isPlayerHittingRock(direction)) {
      if(this.isPlayerOutOfBounds(direction)) this.status.hasHitWall = true;
      if(this.isPlayerHittingRock(direction)) this.status.hasHitRock = true;
      return;
   }

   if(this.isPlayerHittingBall(direction)) {
      this.ballMovingDirection = direction;
      this.moveBall();
      return;
   }

   this.movesNumber += !direction.isNull();
   this.gameField.setPosition(this.playerPosition, null);
   this.playerPosition = this.playerPosition.add(direction);
   this.gameField.setPosition(this.playerPosition, 'player');
}