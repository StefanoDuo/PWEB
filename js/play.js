function start() {
   var gameFieldSize = 10;
   var translator = {
      87: 'UP',
      65: 'LEFT',
      83: 'DOWN',
      68: 'RIGHT',
      81: 'REDO',
      69: 'UNDO',
      82: 'RESET'
   };
   var input = new Input('body', new Queue(), translator);
   var sketcher = new BackgroundSketcher(gameFieldSize, 'gameField', 'box');
   // retrieve levelObject from hidden input element, and transforms simple object into Vectors
   var levelObject = document.getElementById('levelObject').value;
   levelObject = JSON.parse(levelObject);
   levelObject.player = new Vector(levelObject.player.x, levelObject.player.y);
   levelObject.ball = new Vector(levelObject.ball.x, levelObject.ball.y);
   levelObject.hole = new Vector(levelObject.hole.x, levelObject.hole.y);
   var game = new Game(new Matrix(gameFieldSize, gameFieldSize), levelObject, Vector);
   sketcher.drawGrid(game.getGrid());
   input.startListening();

   var score = document.getElementById('score');
   var score2 = document.getElementById('score2').firstChild;
   var shadowDrop = document.getElementById('shadowDrop');

   function startGame() {
      return setInterval(function() {
         score2.textContent = score.value = game.update(input.getPriorityTranslation());
         sketcher.drawGrid(game.getGrid());
      }, 100);
   }

   document.getElementById('playAgain').addEventListener('click', function() {
      shadowDrop.className += ' hidden';
      game.initialize();
      sketcher.drawGrid(game.getGrid());
      intervalID = startGame();
      input.startListening();
   }, false);

   var intervalID = startGame();

   game.setVictoryCallback(function(score, replay) {
      shadowDrop.className = shadowDrop.className.replace(' hidden', '');
      var nickname = document.getElementById('nickname');
      if(nickname) {
         nickname = nickname.firstChild.textContent;
         var levelName = document.getElementById('levelName').firstChild.textContent;
         var levelCreatorNickname = document.getElementById('levelCreatorNickname').firstChild.textContent;
         replay = JSON.stringify(replay);
         var queryString = 'playerNickname=' + nickname + '&levelName=' + levelName;
         queryString += '&levelCreatorNickname=' + levelCreatorNickname + '&score=' + score + '&replay=' + replay;
         ajaxRequest('insertScore.php', 'GET', queryString, true);

         // insert request to receive a link to a new level        
      } else {
         // handling for non logged in user not implemented yet
      }
      window.clearInterval(intervalID);
      input.stopListening();
   });
}