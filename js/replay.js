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
   var sketcher = new Sketcher(GAMEFIELD_SIZE, 'gameField', 'box');

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


   function nextMove() {
      var action;
      // temporary hack, usually while the ball is moving inputs to the game.update() methods
      // get ignored but if we ignore a movement of a replay the end result will be different
      // so we need to pop a move only if we're sure that the game object is ready to accept it
      if(game.isBallMoving())
         action = null
      else
         action = replay.pop();
      game.update(action);
      sketcher.drawGrid(game.getGrid());
   }
   // by pushing REDO and UNDO in this order the first pop will undo the last action
   // the second will redo the action undone by the undo
   function previousMove() {
      stopReplay();
      replay.push('REDO');
      replay.push('UNDO');
      nextMove();
   }

   var intervalId = null;
   var rangeElement = document.getElementById('replaySpeed');
   function startReplay() {
      intervalId = setInterval(nextMove, rangeElement.value);
   }
   function stopReplay() {
      if(!intervalId) return;
      window.clearInterval(intervalId);
      intervalId = null;
   }


   document.getElementById('start').addEventListener('click', startReplay);
   document.getElementById('pause').addEventListener('click', stopReplay);
   document.getElementById('next').addEventListener('click', nextMove);
   document.getElementById('previous').addEventListener('click', previousMove);
   rangeElement.addEventListener('change', function () {
      stopReplay();
      startReplay();
   })
}