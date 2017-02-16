var GAMEFIELD_SIZE = 10;


function start() {
   // initialize input object

   input = new Input('body', new Queue(4));
   input.addListeners();

   // initialize sketcher object
   sketcher = new Sketcher(GAMEFIELD_SIZE, 'gameField', 'box');

   // retrieve levelObject from hidden input element
   var levelObject = document.getElementById('levelObject').value;
   console.log(levelObject);
   levelObject = JSON.parse(levelObject);
   levelObject.player = new Vector(levelObject.player.x, levelObject.player.y);
   levelObject.ball = new Vector(levelObject.ball.x, levelObject.ball.y);
   levelObject.hole = new Vector(levelObject.hole.x, levelObject.hole.y);
   
   var ballMovingDirection = new Vector(0, 0);
   var matrix = new Matrix(GAMEFIELD_SIZE, GAMEFIELD_SIZE);


   game = new Game(matrix, levelObject, ballMovingDirection);

   sketcher.drawGrid(game.getGrid());

   game.intervalID = setInterval(function() {
      game.resetStatus();
      if(game.isBallMoving())
         game.moveBall();
      else
         game.movePlayer(input.getMovements());
      sketcher.drawGrid(game.getGrid());
   }, 100);
}