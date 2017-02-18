var GAMEFIELD_SIZE = 10;


function start() {
   // initialize input object
   var translator = {};
   translator[87] = 'UP';
   translator[65] = 'LEFT';
   translator[83] = 'DOWN';
   translator[68] = 'RIGHT';
   translator[81] = 'REDO';
   translator[69] = 'UNDO';
   translator[82] = 'RESET';

   var input = new Input('body', new Queue(), translator);
   input.addListeners();

   // initialize sketcher object
   var sketcher = new Sketcher(GAMEFIELD_SIZE, 'gameField', 'box');

   // retrieve levelObject from hidden input element
   var levelObject = document.getElementById('levelObject').value;
   levelObject = JSON.parse(levelObject);
   levelObject.player = new Vector(levelObject.player.x, levelObject.player.y);
   levelObject.ball = new Vector(levelObject.ball.x, levelObject.ball.y);
   levelObject.hole = new Vector(levelObject.hole.x, levelObject.hole.y);
   
   var matrix = new Matrix(GAMEFIELD_SIZE, GAMEFIELD_SIZE);
   var game = new Game(matrix, levelObject, Vector);

   sketcher.drawGrid(game.getGrid());

   var intervalID = setInterval(function() {
      game.update(input.getPriorityTranslation());
      sketcher.drawGrid(game.getGrid());
   }, 100);

   game.setVictoryCallback(function(score, replay) {
      console.log('VICTORY-CALLBACK');
      var nickname = document.getElementById('nickname').firstChild.textContent;
      if(nickname) {
         var levelName = document.getElementById('levelName').firstChild.textContent;
         var levelCreatorNickname = document.getElementById('levelCreatorNickname').firstChild.textContent;
         replay = JSON.stringify(replay);
         var queryString = 'playerNickname=' + nickname + '&levelName=' + levelName + '&levelCreatorNickname=' + levelCreatorNickname + '&score=' + score + '&replay=' + replay;
         ajaxRequest('insertScore.php', 'GET', queryString, true);
      } else {
         // handling for non logged in user not implemented yet
      }
      window.clearInterval(intervalID);
   });
}