function filterUndo(element) {
   var action = element.action;
   if(element.hasBallMoved) {
      action = 'BALL ' + action;
   }
   this.push(action);
}

function filterRedo(element) {
   this.push(element.action);
}

function removeChilds(element) {
   while(element.firstChild)
      element.removeChild(element.firstChild);
}

function drawStacks(redoStack, undoStack, undoContainer, redoContainer, translateUndo) {
   var redo = [], undo = [];
   var movesToShow = 5;
   redoStack.forEach(filterRedo, redo);
   undoStack.forEach(filterUndo, undo);
   removeChilds(undoContainer);
   removeChilds(redoContainer);
   for (var i = undo.length - 1; i >=0 && i >= undo.length - (movesToShow + 1); i--) {
      var element = document.createElement('li');
      element.textContent = translateUndo[undo[i]];
      undoContainer.appendChild(element);
   }
   for (var i = redo.length - 1; i >=0 && i >= redo.length - (movesToShow + 1); i--) {
      var element = document.createElement('li');
      element.textContent = redo[i];
      redoContainer.appendChild(element);
   }
}

function updateScore(score, scoreElements) {
   scoreElements.forEach(function(element) {
      element.textContent = score;
   });
}

function start() {
   var playerNickname = document.getElementById('nickname');
   var levelName = document.getElementById('levelName').firstChild.textContent;
   var levelCreatorNickname = document.getElementById('levelCreatorNickname').firstChild.textContent;
   var shadowDrop = document.getElementById('shadowDrop');
   var undoContainer = document.getElementById('undo');
   var redoContainer = document.getElementById('redo');
   var scoreElements = [];
   scoreElements.push(document.getElementById('score').firstChild);
   scoreElements.push(document.getElementById('score2').firstChild);
   var localSaves = new LocalSaves(ajaxRequest);
   if(playerNickname) {
      playerNickname = playerNickname.firstChild.textContent;
      localSaves.pushStoredScoreSaves(playerNickname);
   }
   var gameFieldSize = 10;
   var inputTranslator = {
      87: 'UP',
      65: 'LEFT',
      83: 'DOWN',
      68: 'RIGHT',
      81: 'REDO',
      69: 'UNDO',
      82: 'RESET'
   };
   var translateUndo = {
      'RIGHT': 'LEFT',
      'LEFT': 'RIGHT',
      'UP': 'DOWN',
      'DOWN': 'UP',
      'BALL RIGHT': 'BALL LEFT',
      'BALL LEFT': 'BALL RIGHT',
      'BALL UP': 'BALL DOWN',
      'BALL DOWN': 'BALL UP'
   };
   var input = new Input('body', new Queue(), inputTranslator);
   var sketcher = new BackgroundSketcher(gameFieldSize, 'gameField', 'box');
   var game = localSaves.getResumeSave(levelCreatorNickname, levelName, playerNickname);
   if(!game) {
      // retrieve levelObject from hidden input element, and transforms simple object into Vectors
      var levelObject = decodeURIComponent(document.getElementById('levelObject').value);
      levelObject = JSON.parse(levelObject);
      levelObject.player = new Vector(levelObject.player.x, levelObject.player.y);
      levelObject.ball = new Vector(levelObject.ball.x, levelObject.ball.y);
      levelObject.hole = new Vector(levelObject.hole.x, levelObject.hole.y);
      levelObject.rocks.forEach(function(element, index, array) {
            array[index] = new Vector(element.x, element.y);
      });
      game = new Game(new Matrix(gameFieldSize, gameFieldSize), levelObject, Vector);
   }
   // initial draw of the scene
   var currentState = game.getFullState();
   updateScore(currentState.score, scoreElements);
   drawStacks(currentState.redoStack, currentState.undoStack, undoContainer, redoContainer, translateUndo);
   sketcher.drawGrid(game.getGrid());
   input.startListening();

   function startGame() {
      return setInterval(function() {
         game.update(input.getPriorityTranslation());
         var currentState = game.getFullState();
         updateScore(currentState.score, scoreElements);
         drawStacks(currentState.redoStack, currentState.undoStack, undoContainer, redoContainer, translateUndo);
         sketcher.drawGrid(game.getGrid());
      }, 100);
   }
   var intervalID = startGame();
   var isLevelBeaten = false;
   game.setVictoryCallback(function(score, replay) {
      shadowDrop.className = shadowDrop.className.replace(' hidden', '');
      isLevelBeaten = true;
      if(playerNickname) {
         // if the user is logged in we directly push the level score to the database
         // console.log(playerNickname);
         // console.log(levelName);
         // console.log(levelCreatorNickname);
         // console.log(score);
         // console.log(JSON.stringify(replay));
         localSaves.pushScoreSave(playerNickname, levelName, levelCreatorNickname, score, replay)
      } else {
         // otherwise we save the score in the localStorage waiting for the user to log-in
         localSaves.insertScoreSave(replay, score, levelCreatorNickname, levelName);
      }
      window.clearInterval(intervalID);
      input.stopListening();
   });

   window.onbeforeunload = function(e) {
      if(isLevelBeaten)
         return;
      localSaves.insertResumeSave(game, levelCreatorNickname, levelName, playerNickname);
   }
   // it's the button that appears when the user completes the level
   document.getElementById('playAgain').addEventListener('click', function() {
      shadowDrop.className += ' hidden';
      game.initialize();
      sketcher.drawGrid(game.getGrid());
      intervalID = startGame();
      input.startListening();
   }, false);
}