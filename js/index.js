var GAMEFIELD_SIZE = 10;


function start() {
   // initialize input object

   input = new Input('body', new Queue(4));
   input.addListeners();

   // initialize sketcher object
   sketcher = new Sketcher(GAMEFIELD_SIZE, 'gameField', 'box');

   // initialize game object
   var playerPosition = new Vector(0, 0);
   var ballPosition = new Vector(2, 2);
   var holePosition = new Vector(9, 9);
   var rocksPositions = [
      new Vector(1, 0),
      new Vector(5, 7),
      new Vector(6, 2)
   ];
   var ballMovingDirection = new Vector(0, 0);
   var matrix = new Matrix(GAMEFIELD_SIZE, GAMEFIELD_SIZE);


   game = new Game(matrix, playerPosition, ballPosition, holePosition, rocksPositions, ballMovingDirection);

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