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

   var scoreEl1 = document.getElementById('score').firstChild;
   var scoreEl2 = document.getElementById('score2').firstChild;
   var shadowDrop = document.getElementById('shadowDrop');
   var undoDiv = document.getElementById('undo');
   var redoDiv = document.getElementById('redo');
   var translateUndo = {
      'RIGHT': 'LEFT',
      'LEFT': 'RIGHT',
      'UP': 'DOWN',
      'DOWN': 'UP'
   };

   function filterStack(element) {
      this.push(element.action);
   }

   function removeChilds(element) {
      while(element.firstChild)
         element.removeChild(element.firstChild);
   }


   function drawStacks(redoStack, undoStack) {
      var redo = [], undo = [];
      redoStack.forEach(filterStack, redo);
      undoStack.forEach(filterStack, undo);
      removeChilds(undoDiv);
      removeChilds(redoDiv);
      for (var i = undo.length - 1; i >=0 && i >= undo.length - 11; i--) {
         var element = document.createElement('li');
         element.textContent = translateUndo[undo[i]];
         undoDiv.appendChild(element);
      }
      for (var i = redo.length - 1; i >=0 && i >= redo.length - 11; i--) {
         var element = document.createElement('li');
         element.textContent = redo[i];
         redoDiv.appendChild(element);
      }
   }

   function updateScore(score) {
      scoreEl2.textContent = scoreEl1.textContent = score;
   }

   function startGame() {
      return setInterval(function() {
         game.update(input.getPriorityTranslation());
         var currentState = game.getFullState();
         updateScore(currentState.score);
         drawStacks(currentState.redoStack, currentState.undoStack);
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