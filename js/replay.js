function start() {
   var gameFieldSize = 10;
   var rangeElement = document.getElementById('replaySpeed');
   // used to remember if there are previous action to undo
   var numberOfMoves = 0;
   var intervalId = null;
   buttons = {
      'start': document.getElementById('start'),
      'pause': document.getElementById('pause'),
      'next': document.getElementById('next'),
      'previous': document.getElementById('previous'),
      'reset': document.getElementById('reset')
   };

   var sketcher = new BackgroundSketcher(gameFieldSize, 'gameField', 'box');
   // we need to store the JSON.stringify encoded as an URI otherwise the value attribute
   // of the input elements will be messed up by the json double quotes
   var levelObject = decodeURIComponent(document.getElementById('levelObject').value);
   levelObject = JSON.parse(levelObject);
   levelObject.player = new Vector(levelObject.player.x, levelObject.player.y);
   levelObject.ball = new Vector(levelObject.ball.x, levelObject.ball.y);
   levelObject.hole = new Vector(levelObject.hole.x, levelObject.hole.y);
   var replay = JSON.parse(decodeURIComponent(document.getElementById('replay').value));
   var matrix = new Matrix(gameFieldSize, gameFieldSize);
   var game = new Game(matrix, levelObject, Vector);
   sketcher.drawGrid(game.getGrid());

   function nextMove() {
      var action;
      // temporary hack, usually while the ball is moving inputs to the game.update() methods
      // get ignored but if we ignore a movement of a replay the end result will be different
      // so we need to pop a move only if we're sure that the game object is ready to accept it
      if(game.isBallMoving())
         action = null
      else {
         action = replay.pop();
         numberOfMoves++;
      }
      if(numberOfMoves !== 0 && !buttons.start.disabled) {
         buttons.previous.disabled = false;
         if(intervalId === null)
            buttons.reset.disabled = false;
      }
      game.update(action);
      sketcher.drawGrid(game.getGrid());
   }
   function previousMove() {
      // we need to subtract 2 instead of 1 because at the end we call nextMove which will increment
      // numberOfMoves by 1 even if it's actually going back by one action (doing an undo)
      numberOfMoves -= 2;
      buttons.reset.disabled = false;
      if(numberOfMoves <= 0) {
         buttons.previous.disabled = true;
         buttons.reset.disabled = true;
      }
      // by pushing REDO and UNDO in this order the first pop will undo the last action
      // the second will redo the action undone by the undo
      replay.push('REDO');
      replay.push('UNDO');
      nextMove();
   }
   function startReplay() {
      buttons.pause.disabled = false;
      buttons.start.disabled = true;
      buttons.reset.disabled = true;
      buttons.next.disabled = true;
      buttons.previous.disabled = true;
      intervalId = setInterval(nextMove, rangeElement.value);
   }
   function stopReplay() {
      if(!intervalId) return;
      buttons.pause.disabled = true;
      buttons.start.disabled = false;
      buttons.reset.disabled = false;
      buttons.next.disabled = false;
      if(numberOfMoves !== 0)
         buttons.previous.disabled = false;
      window.clearInterval(intervalId);
      intervalId = null;
   }
   function resetReplay() {
      game.initialize();
      numberOfMoves = 0;
      replay = JSON.parse(decodeURIComponent(document.getElementById('replay').value));
      sketcher.drawGrid(game.getGrid());
      buttons.reset.disabled = true;
      buttons.previous.disabled = true;
   }

   buttons.start.addEventListener('click', startReplay, false);
   buttons.pause.addEventListener('click', stopReplay, false);
   buttons.next.addEventListener('click', nextMove);
   buttons.previous.addEventListener('click', previousMove);
   buttons.reset.addEventListener('click', resetReplay, false);
   rangeElement.addEventListener('change', function () {
      stopReplay();
      startReplay();
   });

   game.setVictoryCallback(function(score, replay) {
      if(!intervalId)
         return;
      window.clearInterval(intervalId);
      intervalId = null;
   });
}