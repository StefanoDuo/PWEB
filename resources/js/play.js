// polyfill for String.prototype.includes() taken from MDN
if(!String.prototype.includes) {
   String.prototype.includes = function(search, start) {
      if (typeof start !== 'number') {
         start = 0;
      }
       
      if (start + search.length > this.length) {
         return false;
      } else {
         return this.indexOf(search, start) !== -1;
      }
   };
}

function filterStack(element) {
   var action = element.action;
   if(element.hasBallMoved) {
      action = 'BALL ' + action;
   }
   this.push(action);
}

function removeChilds(element) {
   while(element.firstChild)
      element.removeChild(element.firstChild);
}

function drawStacks(redoStack, undoStack, undoContainer, redoContainer, translateUndo, translateRedo, movesToShow) {
   var redo = [], undo = [];
   redoStack.forEach(filterStack, redo);
   undoStack.forEach(filterStack, undo);
   removeChilds(undoContainer);
   removeChilds(redoContainer);
   for (var i = undo.length - 1; i >=0 && i >= undo.length - (movesToShow + 1); i--) {
      var liElement = document.createElement('li');
      var divElement = document.createElement('div');
      divElement.className = 'kbd';
      if(undo[i].includes('BALL'))
         divElement.className += ' primary';
      var kbdElement = document.createElement('kbd');
      kbdElement.textContent = translateUndo[undo[i]];
      divElement.appendChild(kbdElement);
      liElement.appendChild(divElement);
      undoContainer.appendChild(liElement);
   }
   for (var i = redo.length - 1; i >=0 && i >= redo.length - (movesToShow + 1); i--) {
      var liElement = document.createElement('li');
      var divElement = document.createElement('div');
      divElement.className = 'kbd';
      if(redo[i].includes('BALL'))
         divElement.className += ' primary';
      var kbdElement = document.createElement('kbd');
      kbdElement.textContent = translateRedo[redo[i]];
      divElement.appendChild(kbdElement);
      liElement.appendChild(divElement);
      redoContainer.appendChild(liElement);
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
   var levelCreatorNickname = document.getElementById('levelCreatorNickname').value;
   var shadowDrop = document.getElementById('shadowDrop');
   var gamefield = document.getElementById('gameField');
   var undoContainer = document.getElementById('undo');
   var redoContainer = document.getElementById('redo');
   var scoreElements = [];
   scoreElements.push(document.getElementById('score').firstChild);
   var localSaves = new LocalSaves(ajaxRequest);
   if(playerNickname) {
      playerNickname = playerNickname.firstChild.textContent;
      localSaves.pushStoredScoreSaves(playerNickname);
   }
   var gameFieldSize = 20;
   var refreshTimer = 100;
   var movesToShow = 5;
   var inputTranslator = {
      87: 'UP',
      65: 'LEFT',
      83: 'DOWN',
      68: 'RIGHT',
      81: 'UNDO',
      69: 'REDO',
      82: 'RESET'
   };
   var translateRedo = {
      'LEFT': '←',
      'RIGHT': '→',
      'DOWN': '↓',
      'UP': '↑',
      'BALL LEFT': '←',
      'BALL RIGHT': '→',
      'BALL DOWN': '↓',
      'BALL UP': '↑'
   };
   var translateUndo = {
      'LEFT': '→',
      'RIGHT': '←',
      'DOWN': '↑',
      'UP': '↓',
      'BALL LEFT': '→',
      'BALL RIGHT': '←',
      'BALL DOWN': '↑',
      'BALL UP': '↓'
   };

   var input = new Input('body', new Queue(), inputTranslator);
   var sketcher = new BackgroundSketcher(gameFieldSize, 'gameField', 'box', ['tile2.png', 'tile1.png'], function() {
      return Math.round(Math.random(0, 1) + 0.3);
   });
   var tileMargin = 1, tileBoxSize = 25, containerPadding = 0;
   var playerClasses = {
      'up': 'playerTop',
      'down': 'playerDown',
      'left': 'playerLeft',
      'right': 'playerRight'
   }
   var ballClasses = {
      'up': 'ballDown',
      'down': 'ballDown',
      'left': 'ballDown',
      'right': 'ballDown'
   }
   var playerTile = new ForegroundSketcher('player', 'gameField', 'box playerTransition', playerClasses, tileMargin, tileBoxSize, containerPadding, containerPadding);
   var ballTile = new ForegroundSketcher('ball', 'gameField', 'box ballTransition', ballClasses, tileMargin, tileBoxSize, containerPadding, containerPadding);

   // first we check if we can resume a saved gameplay
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
   drawStacks(currentState.redoStack, currentState.undoStack, undoContainer, redoContainer, translateUndo, translateRedo, movesToShow);
   sketcher.drawGrid(game.getGrid());
   playerTile.setPosition(currentState.playerPosition);
   ballTile.setPosition(currentState.ballPosition);
   input.startListening();

   function startGame() {
      return setInterval(function() {
         var action = input.getPriorityTranslation();
         game.update(action);
         var currentState = game.getFullState();
         updateScore(currentState.score, scoreElements);
         drawStacks(currentState.redoStack, currentState.undoStack, undoContainer, redoContainer, translateUndo, translateRedo, movesToShow);
         if(action === 'RESET') {
            ballTile.initialize();
            playerTile.initialize();
         } else {
            action = currentState.action ? currentState.action.toLowerCase() : false;
            ballTile.setPosition(currentState.ballPosition, action);
            playerTile.setPosition(currentState.playerPosition, action);
         }
      }, refreshTimer);
   }
   var intervalID = startGame();
   var isLevelBeaten = false;
   game.setVictoryCallback(function(score, replay) {
      console.log(ballTile.tile.className);
      shadowDrop.className = shadowDrop.className.replace(' hidden', '');
      gamefield.className += ' blurred';
      ballTile.tile.id = 'fallingBall';
      isLevelBeaten = true;
      if(playerNickname) {
         // if the user is logged in we directly push the level score to the database
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
      console.log(ballTile.tile.className);
      shadowDrop.className += ' hidden';
      gamefield.className = gamefield.className.replace(' blurred', '');
      ballTile.tile.id = 'ball';
      game.initialize();
      sketcher.drawGrid(game.getGrid());
      intervalID = startGame();
      input.startListening();
      console.log(ballTile.tile.className);
   }, false);
}