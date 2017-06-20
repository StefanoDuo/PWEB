/* contains the game logic
 *
 * DEPENDENCIES: Vector constructor, Matrix object
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
   this.gameField.reset(null);
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
   this.score = 0;
   this.replay = [];
}

// creating a method instead of initializing it in the constructor allows
// put a callback that disables the setInterval used for the game loop
// this function will be called when the ball falls through the hole and
// will receive the score and replay as first and second parameter
Game.prototype.setVictoryCallback = function(victoryCallback) {
   this.victoryCallback = victoryCallback;
}



// interface to the sketcher object or whatever we want to use
Game.prototype.getGrid = function() {
   return this.gameField.matrix;
}



// collision check logic
Game.prototype.isOutOfBounds = function(entityPosition, direction) {
   var newPosition = entityPosition.add(direction);
   return !newPosition.belongsToSquare(this.gameField.rowNumber - 1);
}

Game.prototype.isPlayerOutOfBounds = function(direction) {
   return this.isOutOfBounds(this.playerPosition, direction);
}

Game.prototype.isBallOutOfBounds = function() {
   return this.isOutOfBounds(this.ballPosition, this.ballMovingDirection);
}

Game.prototype.isColliding = function(entityPosition, direction) {
   var newPosition = entityPosition.add(direction);
   return this.gameField.getPosition(newPosition);
}

Game.prototype.isPlayerColliding = function(direction) {
   return this.isColliding(this.playerPosition, direction);
}

Game.prototype.isBallColliding = function() {
   return this.isColliding(this.ballPosition, this.ballMovingDirection);
}

Game.prototype.isBallMoving = function() {
   return !(this.ballMovingDirection.isNull());
}



// states logic
Game.prototype.getFullState = function() {
   var fullState = this.getCurrentState();
   fullState.undoStack = this.undoStack;
   fullState.redoStack = this.redoStack;
   fullState.score = this.score
   return fullState;
}

Game.prototype.getCurrentState = function() {
   return {
      playerPosition: this.playerPosition,
      ballPosition: this.ballPosition,
      ballMovingDirection: this.ballMovingDirection,
      hasBallMoved: this.hasBallMoved,
      action: this.currentAction
   };
}

Game.prototype.setCurrentState = function(state) {
   this.updatePlayerPosition(state.playerPosition);
   this.updateBallPosition(state.ballPosition);
   this.ballMovingDirection = state.ballMovingDirection;
   this.hasBallMoved = state.hasBallMoved;
   this.action = state.action;
}

Game.prototype.undo = function() {
   var previousState = this.undoStack.pop();
   // can't undo before the first action
   if(!previousState)
      return false;;
   this.replay.shift();
   var currentState = this.getCurrentState();
   // instead of showing undo we show the action that has been undone
   currentState.action = previousState.action;
   currentState.hasBallMoved = previousState.hasBallMoved;
   this.redoStack.push(currentState);
   this.setCurrentState(previousState);
   return true;
}

Game.prototype.redo = function() {
   var previousState = this.redoStack.pop();
   // if there wasn't an undo prior to the redo, undoStateStack will be empty
   if(!previousState)
      return false;;
   this.replay.unshift(previousState.action);
   var currentState = this.getCurrentState();
   currentState.action = previousState.action;
   currentState.hasBallMoved = previousState.hasBallMoved;
   this.undoStack.push(currentState);
   this.setCurrentState(previousState);
   return true;
}



// interface to the input object or whatever we want to use
Game.prototype.update = function(action) {
   var direction;
   this.currentAction = action;
   this.hasBallMoved = false;
   this.score++;
   switch(action) {
      case 'UP':
         direction = new this.vectorConstructor(0, -1);
         break;
      case 'DOWN':
         direction = new this.vectorConstructor(0, 1);
         break;
      case 'LEFT':
         direction = new this.vectorConstructor(-1, 0);
         break;
      case 'RIGHT':
         direction = new this.vectorConstructor(1, 0);
         break;
      case 'RESET':
         this.initialize();
         return;
      case 'UNDO':
         if(!this.undo())
            this.score--;
         return;
      case 'REDO':
         if(!this.redo())
            this.score--;
         return;
      default:
         // if there's no action but the ball is moving
         // we need to update its position
         this.score--;
         this.moveBall();
         return;
   }
   // at the moment the ball and the player can't move at the same time
   // if we want to allow that in the future the ball movement must be
   // all computed at the same time otherwhise redo and undo action could
   // lead to buggy behaviour
   if(this.isBallMoving()) {
      this.moveBall();
      return;
   }
   // you can redo action only while you're undo-ing, as soon
   // as you make a real move your redo stack is emptied
   this.redoStack = [];
   if(!this.movePlayer(direction))
      this.score--;
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
   while(this.isBallMoving()) {
      if(this.isBallOutOfBounds()) {
         this.ballMovingDirection = new this.vectorConstructor(0, 0);
         return;
      }
      var object = this.isBallColliding();
      if(object === 'rock')
         this.ballMovingDirection = new this.vectorConstructor(0, 0);
      this.updateBallPosition(this.ballPosition.add(this.ballMovingDirection));
      if(object === 'hole') {
         this.ballMovingDirection = new this.vectorConstructor(0, 0);
         if(this.victoryCallback)
            this.victoryCallback(this.score, this.replay);
      }
   }
}

Game.prototype.movePlayer = function(direction) {
   if(direction.isNull())
      return false;
   var object = this.isPlayerColliding(direction);
   if(this.isPlayerOutOfBounds(direction) || object) {
      if(object === 'ball') {
         var oldBallPosition = this.ballPosition;
         this.ballMovingDirection = direction;
         this.moveBall();
         if(!oldBallPosition.isEqual(this.ballPosition)) {
            // if the player is pushing the ball against a wall the
            // score doesn't increase
            this.replay.unshift(this.currentAction);
            this.hasBallMoved = true;
            var currentState = this.getCurrentState();
            currentState.ballMovingDirection = new this.vectorConstructor(0, 0);
            currentState.ballPosition = oldBallPosition;
            this.undoStack.push(currentState);
            return true;
         }
      }
      return false;
   }
   this.replay.unshift(this.currentAction);
   this.undoStack.push(this.getCurrentState());
   this.updatePlayerPosition(this.playerPosition.add(direction));
   return true;
}
