var GAMEFIELD_SIZE = 10;

function start() {
   // initialize input object
   var translator = {
      87: 'UP',
      65: 'LEFT',
      83: 'DOWN',
      68: 'RIGHT',
      81: 'REDO',
      69: 'UNDO',
      82: 'RESET'
   };

   // initialize sketcher object
   var sketcher = new BackgroundSketcher(GAMEFIELD_SIZE, 'gameField', 'box');
   // retrieve levelObject from hidden input element
   var levelObject = decodeURIComponent(document.getElementById('levelObject').value);
   console.log(levelObject);
   levelObject = JSON.parse(levelObject);
   levelObject.player = new Vector(levelObject.player.x, levelObject.player.y);
   levelObject.ball = new Vector(levelObject.ball.x, levelObject.ball.y);
   levelObject.hole = new Vector(levelObject.hole.x, levelObject.hole.y);
   var replay = JSON.parse(decodeURIComponent(document.getElementById('replay').value));
   var matrix = new Matrix(GAMEFIELD_SIZE, GAMEFIELD_SIZE);
   var game = new Game(matrix, levelObject, Vector);
   sketcher.drawGrid(game.getGrid());

   buttons = {
      'start': document.getElementById('start'),
      'pause': document.getElementById('pause'),
      'next': document.getElementById('next'),
      'previous': document.getElementById('previous'),
      'reset': document.getElementById('reset')
   };

   var rangeElement = document.getElementById('replaySpeed');
   // used to remember if there are previous action to undo
    numberOfMoves = 0;
   var intervalId = null;

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
      if(numberOfMoves !== 0 && !buttons.start.disabled)
         buttons.previous.disabled = false;
      game.update(action);
      sketcher.drawGrid(game.getGrid());
   }
   // by pushing REDO and UNDO in this order the first pop will undo the last action
   // the second will redo the action undone by the undo
   function previousMove() {
      // i need to subtract 2 instead of 1 because at the end we call nextMove which will increment
      // numberOfMoves by 1 even if it's actually going back by one action (doing an undo)
      numberOfMoves -= 2;
      if(numberOfMoves <= 0)
         buttons.previous.disabled = true;
      else
         buttons.previous.disabled = false;
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
      replay = JSON.parse(decodeURIComponent(document.getElementById('replay').value));
      sketcher.drawGrid(game.getGrid());
      buttons.reset.disabled = true;
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
   });
}