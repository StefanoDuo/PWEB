var GAMEFIELD_SIZE = 10;


function start() {
   // initialize input object
   translator = {};
   translator[87] = 'UP';
   translator[65] = 'LEFT';
   translator[83] = 'DOWN';
   translator[68] = 'RIGHT';
   translator[81] = 'REDO';
   translator[69] = 'UNDO';
   translator[82] = 'RESET';

   input = new Input('body', new Queue(), translator);
   input.addListeners();

   // initialize sketcher object
   sketcher = new Sketcher(GAMEFIELD_SIZE, 'gameField', 'box');

   // retrieve levelObject from hidden input element
   var levelObject = document.getElementById('levelObject').value;
   levelObject = JSON.parse(levelObject);
   levelObject.player = new Vector(levelObject.player.x, levelObject.player.y);
   levelObject.ball = new Vector(levelObject.ball.x, levelObject.ball.y);
   levelObject.hole = new Vector(levelObject.hole.x, levelObject.hole.y);
   
   var matrix = new Matrix(GAMEFIELD_SIZE, GAMEFIELD_SIZE);

   game = new Game(matrix, levelObject, Vector);

   sketcher.drawGrid(game.getGrid());

   game.intervalID = setInterval(function() {
      game.update(input.getPriorityTranslation());
      sketcher.drawGrid(game.getGrid());
   }, 100);
}