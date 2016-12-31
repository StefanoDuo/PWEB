var GAMEFIELD_SIZE = 10;
var DEBUGGING = true;

//-----------------------------------------------------//
//-------------------- GAME OBJECT --------------------//
//-----------------------------------------------------//
//interface between keyboard events etc. and player movements

function Game(gameFieldSize, playerPosition, ballPosition, holePosition, rocksPositions) {
   //initialization of the 2d matrix representing the game field
   this.gameFieldSize = gameFieldSize;
   this.gameField = new Array(gameFieldSize);
   for(var i = 0; i < gameFieldSize; i++) {
      this.gameField[i] = new Array(gameFieldSize);
      for(var j = 0; j < gameFieldSize; j++)
         //initialize all location with NULL (empty space)
         this.gameField[i][j] = null;

      //positioning player, ball, hole and rocks accordingly to parameters
      this.gameField[playerPosition.x][playerPosition.y] = "player";
      this.gameField[ballPosition.x][ballPosition.y] = "ball";
      this.gameField[holePosition.x][holePosition.y] = "hole";
      rocksPositions.forEach(function(element) {
         this.gameField[element.x][element.y].bind(this) = "rock";
      });

   //storing player and ball positions for fast access during updates
   this.player = {x: playerPosition.x, y: playerPosition.y};
   this.ball = {x: ballPosition.x, y: ballPosition.y};

   if(DEBUGGING) console.log(this);

}




//----------------------------------------------------//
//------------------- INPUT OBJECT -------------------//
//----------------------------------------------------//
//interface between keyboard events etc. and player movements

function Input(whereToListen) {
   this.isWpressed = false;
   this.isApressed = false;
   this.isSpressed = false;
   this.isDpressed = false;
   /* supports other keybinding for movements
   /* this.isArrowUpPressed = false;
   /* this.isArrowDownPressed = false;
   /* this.isArrowLeftPressed = false;
   /* this.isArrowRightPressed = false;
    */
   this.lastEvent = null;
   this.whereToListen = document.getElementById(whereToListen);

}

Input.prototype.setKeyCode = function (keyCode, value) {
   switch(keyCode) {
      case 87: //W
         this.isWpressed = value;
         break;
      case 65: //A
         this.isApressed = value;
         break;
      case 83: //S
         this.isSpressed = value;
         break;
      case 68: //D
         this.isDpressed = value;
   }

   if(DEBUGGING) {
      console.log(value ? "KEYDOWN" : "KEYUP");
      console.log(this);
   }
}

Input.prototype.addListeners = function() {
   this.whereToListen.addEventListener("keydown", function(e) {
      e = e || window.event;

      // checks if the key is being held down, if that's
      // the case the browser keeps firing keydown events
      if(this.lastEvent && this.lastEvent.keyCode === e.keyCode)
         return;
      this.lastEvent = e;

      this.setKeyCode(e.keyCode, true);
   }.bind(this), false);

   this.whereToListen.addEventListener("keyup", function(e) {
      e = e || window.event;

      //clears last event
      this.lastEvent = null;

      this.setKeyCode(e.keyCode, false);
   }.bind(this), false);
}

//interface to the inputs logic
Input.prototype.getMovements = function() {
   if(this.isWpressed) {
      return "Up";
   } else if(this.isSpressed) {
      return "Down";
   } else if(this.isApressed) {
      return "Left";
   } else if(this.isDpressed) {
      return "Right";
   } else
      return null;
}



//-----------------------------------------------------//
//------------------ SKETCHER OBJECT ------------------//
//-----------------------------------------------------//
//interface between keyboard events etc. and player movements

function Sketcher(gameFieldSize, whereToDraw) {
   this.whereToDraw = document.getElementById(whereToDraw);
   var element = 
}


function start() {
   input = new Input("body");
   input.addListeners();
}