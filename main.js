var GAMEFIELD_SIZE = 10;
var DEBUGGING = true;


function start() {
   //initialize input object
   input = new Input('body');
   input.addListeners();

   //initialize sketcher object
   sketcher = new Sketcher(GAMEFIELD_SIZE, 'gameField');

   //initialize game object
   var playerPosition = {
      x: 0,
      y: 0
   };
   var ballPosition = {
      x: 2,
      y: 2
   };
   var holePosition = {
      x: 9,
      y: 9
   };
   var rocksPositions = [
   {
      x: 1,
      y: 0
   },
   {
      x: 5,
      y: 7
   
   }];
   game = new Game(GAMEFIELD_SIZE, playerPosition, ballPosition, holePosition, rocksPositions);

   sketcher.draw(game.getGrid());

   setInterval(function() {
      game.movePlayer(input.getMovements());
      sketcher.draw(game.getGrid());
   }, 200)
}