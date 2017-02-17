/* contains the game logic
 *
 * DEPENDENCIES: Vector, Matrix objects
 */

function Game(matrix, levelObject, vectorConstructor) {
   this.levelObject = levelObject;
   this.levelObject.ballMovingDirection = new vectorConstructor(0, 0);
   this.gameField = matrix;
   this.vectorConstructor = vectorConstructor;

   this.initialize();
}


// the initialization is done through a method so we can easily
// reset the level during gameplay
Game.prototype.initialize = function() {
   this.undoStack = [];
   this.redoStack = [];
   this.gameField.reset();
   this.gameField.setPosition(this.levelObject.player, 'player');
   this.gameField.setPosition(this.levelObject.ball, 'ball');
   this.gameField.setPosition(this.levelObject.hole, 'hole');

   // the second argument changes the forEach scope,
   // if not specified it default to the window object
   this.levelObject.rocks.forEach(function(element) {
      this.gameField.setPosition(element, 'rock');
   }, this);

   // storing player and ball positions to update them easily
   this.playerPosition = this.levelObject.player;
   this.ballPosition = this.levelObject.ball;
   this.ballMovingDirection = this.levelObject.ballMovingDirection;

   this.intervalID = null;
   this.score = 0;
   this.status = {
      hasHitWall: false,
      hasHitHole: false,
      hasHitRock: false
   };
}



// interface to the sketcher object or whatever we want to use
Game.prototype.getGrid = function() {
   return this.gameField.matrix;
}

Game.prototype.resetStatus = function() {
   this.status.hasHitWall = false;
   this.status.hasHitHole = false;
   this.status.hasHitRock = false;
}



// collision check logic
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

// checks if entity will hit collidingWith after moving towards direction
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



// states logic
Game.prototype.getCurrentState = function() {
   return {
      playerPosition: this.playerPosition,
      ballPosition: this.ballPosition,
      ballMovingDirection: this.ballMovingDirection
   };
}

Game.prototype.setCurrentState = function(state) {
   this.updatePlayerPosition(state.playerPosition);
   this.updateBallPosition(state.ballPosition);
   this.ballMovingDirection = state.ballMovingDirection;
}

Game.prototype.undo = function() {
   var previousState = this.undoStack.pop();
   // can't undo before the first action
   if(!previousState)
      return;
   this.redoStack.push(this.getCurrentState());
   this.setCurrentState(previousState);
}

Game.prototype.redo = function() {
   var previousState = this.redoStack.pop();
   // if there wasn't an undo prior to the redo, undoStateStack will be empty
   if(!previousState)
      return;
   this.undoStack.push(this.getCurrentState());
   this.setCurrentState(previousState);
}



// interface to the input object or whatever we want to use
Game.prototype.update = function(action) {
   this.resetStatus();
   var direction;
   if(action === 'UP')
      direction = new this.vectorConstructor(0, -1);
   else if(action === 'DOWN')
      direction = new this.vectorConstructor(0, 1);
   else if(action === 'LEFT')
      direction = new this.vectorConstructor(-1, 0);
   else if(action === 'RIGHT')
      direction = new this.vectorConstructor(1, 0);
   else if(action === 'RESET') {
      this.initialize();
      return;
   } else if(action === 'UNDO'){
      this.undo();
      return;
   } else if(action === 'REDO') {
      this.redo();
      return;
   } else if(!this.isBallMoving())
      // if there's no action and the ball isn't moving
      // update doesn't need to do anything
      return;

   // at the moment the ball and the player can't move at the same time
   // if we want to allow that in the future the ball movement must be
   // all computed at the same time otherwhise redo and undo action could
   // lead to buggy behaviour
   if(this.isBallMoving())
      this.moveBall();
   else {
      // you can redo action only while you're undo-ing, as soon
      // as you make a real move your redo stack is emptied
      this.redoStack = [];
      this.undoStack.push(this.getCurrentState());
      this.movePlayer(direction);
   }
}


// movements methods
Game.prototype.updateEntityPosition = function(entity, newPosition) {
   this.gameField.setPosition(this[entity + 'Position'], null);
   this[entity + 'Position'] = newPosition;
   this.gameField.setPosition(newPosition, entity);
}
Game.prototype.updatePlayerPosition = function(newPosition) {
   this.updateEntityPosition('player', newPosition);
}
Game.prototype.updateBallPosition = function(newPosition) {
   this.updateEntityPosition('ball', newPosition);
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

   this.updateBallPosition(this.ballPosition.add(this.ballMovingDirection));
}

Game.prototype.movePlayer = function(direction) {
   if(direction.isEqual(new Vector(0,0)))
      return;
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

   this.score++;
   this.updatePlayerPosition(this.playerPosition.add(direction));
}
