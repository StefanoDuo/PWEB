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
   var levelObject = document.getElementById('levelObject').value;
   levelObject = JSON.parse(levelObject);
   levelObject.player = new Vector(levelObject.player.x, levelObject.player.y);
   levelObject.ball = new Vector(levelObject.ball.x, levelObject.ball.y);
   levelObject.hole = new Vector(levelObject.hole.x, levelObject.hole.y);
   var replay = JSON.parse(document.getElementById('replay').value);
   var matrix = new Matrix(GAMEFIELD_SIZE, GAMEFIELD_SIZE);
   var game = new Game(matrix, levelObject, Vector);
   sketcher.drawGrid(game.getGrid());

   buttons = {
      start : document.getElementById('start'),
      pause : document.getElementById('pause'),
      next : document.getElementById('next'),
      previous : document.getElementById('previous')
   };

   var rangeElement = document.getElementById('replaySpeed');
   // used to remember if there are previous action to undo
   var numberOfMoves = 0;
   var intervalId = null;

   function nextMove() {
      var action;
      // temporary hack, usually while the ball is moving inputs to the game.update() methods
      // get ignored but if we ignore a movement of a replay the end result will be different
      // so we need to pop a move only if we're sure that the game object is ready to accept it
      if(game.isBallMoving())
         action = null
      else {
         numberOfMoves++;
         action = replay.pop();
      }
      if(numberOfMoves !== 0 && !buttons.start.disabled)
         buttons.previous.disabled = false;
      game.update(action);
      sketcher.drawGrid(game.getGrid());
   }
   // by pushing REDO and UNDO in this order the first pop will undo the last action
   // the second will redo the action undone by the undo
   function previousMove() {
      stopReplay();
      numberOfMoves -= 2;
      if(numberOfMoves <= 0)
         buttons.previous.setAttribute('disabled', '');
      else
         buttons.previous.removeAttribute('disabled');

      replay.push('REDO');
      replay.push('UNDO');
      nextMove();
   }
   function startReplay() {
      buttons.pause.disabled = false;
      buttons.start.disabled = true;
      buttons.next.disabled = true;
      buttons.previous.disabled = true;
      intervalId = setInterval(nextMove, rangeElement.value);
   }
   function stopReplay() {
      if(!intervalId) return;
      buttons.pause.disabled = true;
      buttons.start.disabled = false;
      buttons.next.disabled = false;
      if(numberOfMoves !== 0)
         buttons.previous.disabled = false;
      window.clearInterval(intervalId);
      intervalId = null;
   }

   buttons.start.addEventListener('click', startReplay);
   buttons.pause.addEventListener('click', stopReplay);
   buttons.next.addEventListener('click', nextMove);
   buttons.previous.addEventListener('click', previousMove);
   rangeElement.addEventListener('change', function () {
      stopReplay();
      startReplay();
   })
}