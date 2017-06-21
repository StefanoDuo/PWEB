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

function fetchLevelObject(grid) {
   var levelObject = {
      player : null,
      ball : null,
      hole : null,
      rocks : []
   };
   var string = '';

   for(var i = 0; i < grid.length; i++) {
      for(var j = 0; j < grid[i].length; j++) {
         // checks the classname of every element in the grid removing the substrings
         // 'box', ' ', 'borders' or any their(?) combination
         string = grid[i][j].className.replace(/box|borders|\s/g, '');
         if(string !== '') {
            if(string === 'player' || string === 'ball' || string === 'hole') {
               if(levelObject[string] !== null) {
                  throw "You can't place multiple players, chests or holes.";
               } else {
               levelObject[string] = new Vector(j, i);
               }
            } else {
               levelObject.rocks.push(new Vector(j, i));
            }
         }
      }
   }
   if(levelObject.player === null) {
      throw 'You need to place the character.';
   }
   if(levelObject.ball === null) {
      throw 'You need to place the chest.';
   }
   if(levelObject.hole === null) {
      throw 'You need to place the hole.';
   }
   return levelObject;
}

function start() {
   document.getElementById('gameField').style.backgroundImage = 'none';
   var errorMessage = document.getElementById('errorMessage');
   var gamefieldSize = 20;
   var pressedButton = null;
   var buttons = {
      player: document.getElementById('player'),
      ball: document.getElementById('ball'),
      hole: document.getElementById('hole'),
      rock: document.getElementById('rock'),
      reset: document.getElementById('reset'),
      save: document.getElementById('save')
   };

   function releaseButton(button) {
      button.className = button.className.replace('primary', 'secondaryDark');
      button.removeAttribute('pressed');
      pressedButton = null;
   }
   function clickButton(button) {
      button.blur(); // removes the focus state from the button
      if(button.hasAttribute('pressed')) {
         // the button is currently pressed we need to release it
         releaseButton(button)
      } else {
         // we need to press the button but first we release the
         // pressed one if it exists
         if(pressedButton)
            releaseButton(pressedButton);
         button.setAttribute('pressed', '');
         button.className = button.className.replace('secondaryDark', 'primary');
         pressedButton = button;
      }
   }

   buttons.player.addEventListener('click', function() {
      clickButton(this);
   });
   buttons.ball.addEventListener('click', function() {
      clickButton(this);
   });
   buttons.hole.addEventListener('click', function() {
      clickButton(this);
   });
   buttons.rock.addEventListener('click', function() {
      clickButton(this);
   });
   buttons.reset.addEventListener('click', function() {
      for(var i = 0; i < grid.length; i++)
         for(var j = 0; j < grid[i].length; j++)
            sketcher.drawBoxByCoordinates(j, i, '');
   });
   buttons.save.addEventListener('click', function() {
      errorMessage.textContent = '';
      try {
         var levelObject = fetchLevelObject(grid);
      } catch(exception) {
         errorMessage.textContent = exception;
         return;
      }
      var levelName = document.getElementById('levelName').value;
      if(!levelName) {
         errorMessage.textContent = "Level name can't be empty.";
         return;
      }
      if(!isLevelBeatable(levelObject)) {
         errorMessage.textContent = "The level can't be beaten.";
         return;
      }
      var creatorNickname = document.getElementById('nickname').firstChild.textContent;
      var queryString = 'levelObject=' + JSON.stringify(levelObject) + '&levelName=' + levelName + '&creatorNickname=' +creatorNickname;
      buttons.save.disabled = true;
      ajaxRequest('endpoints/insertLevel.php', 'GET', queryString, true, function(responseText) {
         buttons.save.disabled = false;
         responseText = JSON.parse(responseText);
         if(responseText.success)
            window.location.href = "play.php?creatorNickname=" + creatorNickname + "&levelName=" + levelName;
         else
            errorMessage.textContent = responseText.errorMessage;
      });
   });

   var sketcher = new BackgroundSketcher(gamefieldSize, 'gameField', 'box borders');
   // var sketcher = new BackgroundSketcher(gamefieldSize, 'gameField', 'box', ['tile2.png', 'tile1.png']);
   var grid = sketcher.getGrid();
   for(var i = 0; i < grid.length; i++) {
      for(var j = 0; j < grid[i].length; j++) {
         grid[i][j].addEventListener('click', function() {
            if(pressedButton === null) return;
            sketcher.drawBoxById(this.id, this.className.includes(pressedButton.id) ? '' : pressedButton.id);
         })
      }
   }
}









function createConfiguration(playerPosition, ballPosition) {
   return {
      'player': playerPosition,
      'ball': ballPosition
   };
}

function areConfigurationEqual(configuration1, configuration2) {
   if(configuration1.player.x !== configuration2.player.x)
      return false;
   if(configuration1.player.y !== configuration2.player.y)
      return false;
   if(configuration1.ball.x !== configuration2.ball.x)
      return false;
   if(configuration1.ball.y !== configuration2.ball.y)
      return false;
   return true;
}

function arePositionEqual(position1, position2) {
   if(position1.x !== position2.x)
      return false;
   if(position1.y !== position2.y)
      return false;
   return true;
}

function Set(comparisonFunction) {
   this.elements = [];
   this.compare = comparisonFunction;
}

Set.prototype.contains = function(element) {
   for(var i = 0; i < this.elements.length; i++)
      if(this.compare(this.elements[i], element))
         return true;
   return false;
}

Set.prototype.insert = function(element) {
   this.elements.push(element);
   return true;
}

/* Checks if a level can be beaten by creating all the possible ball and player
 * configurations.
 * A Set is used to store every "visited" configuration.
 * Possible configurations are created by placing the player next to the ball,
 * if the player isn't colliding with another object then the configuration is
 * feasible and added to a Queue.
 * The Queue is initialized using the ball starting position.
 * If the Queue empties without the ball hitting the hole then the level cannot be beaten.
 */
function isLevelBeatable(levelObject, gameFieldSize) {
   gameFieldSize = gameFieldSize || 20;
   var game = new Game(new Matrix(gameFieldSize, gameFieldSize), levelObject, Vector);
   var hasHitHole = false;
   game.setVictoryCallback(function() {
      hasHitHole = true;
      console.log('the ball has hit the hole.');
   })
   var visitedConfigurations = new Set(areConfigurationEqual);
   var nextConfigurations = new Queue();

   // does not alter the game variable
   function isConfigurationPossible(configuration) {
      // we need to remove 1 from gamefield size because the vector method checks with <=
      if(!configuration.player.belongsToSquare(gameFieldSize - 1) || !configuration.ball.belongsToSquare(gameFieldSize - 1))
         return false;
      // we need to save and restore the ball and player position inside the game object
      // otherwise we end up changing the level, because everytime we collide with something
      // the playerPosition contains the position of the object and the next call to
      // updateEntityPosition deletes that object
      var oldPlayerPosition = game.playerPosition;
      var oldBallPosition = game.ballPosition;
      game.playerPosition = configuration.player;
      game.ballPosition = configuration.ball;
      var direction = new Vector(0, 0);
      var result = !Boolean(game.isPlayerColliding(direction))
      game.playerPosition = oldPlayerPosition;
      game.ballPosition = oldBallPosition;
      return result;
   }

   function isPositionReachable(oldPlayerPosition, newPlayerPosition) {
      var visitedPositions = new Set()
   }

   // we never need the player starting position
   game.gameField.setPosition(game.playerPosition, null);

   var configuration = createConfiguration(game.ballPosition.add(new Vector(0, 1)), game.ballPosition, );
   if(isConfigurationPossible(configuration)) {
      nextConfigurations.enqueue(configuration);
   }
   configuration = createConfiguration(game.ballPosition.subtract(new Vector(0, 1)), game.ballPosition, );
   if(isConfigurationPossible(configuration)) {
      nextConfigurations.enqueue(configuration);
   }
   configuration = createConfiguration(game.ballPosition.add(new Vector(1, 0)), game.ballPosition, );
   if(isConfigurationPossible(configuration)) {
      nextConfigurations.enqueue(configuration);
   }
   configuration = createConfiguration(game.ballPosition.subtract(new Vector(1, 0)), game.ballPosition, );
   if(isConfigurationPossible(configuration)) {
      nextConfigurations.enqueue(configuration);
   }

   while(!nextConfigurations.isEmpty()) {
      configuration = nextConfigurations.dequeue();
      if(!visitedConfigurations.contains(configuration)) {
         visitedConfigurations.insert(configuration);

         // removes old positions and set new ones
         game.updateEntityPosition('player', configuration.player)
         game.updateEntityPosition('ball', configuration.ball)

         var direction = game.ballPosition.subtract(game.playerPosition);
         var action = ''
         if(direction.x === 1)
            action = 'RIGHT';
         else if(direction.x === -1)
            action = 'LEFT';
         else if(direction.y === 1)
            action = 'DOWN';
         else if(direction.y === -1)
            action = 'UP';
         else
            throw 'something went wrong while calculating the direction.';

         game.update(action);
         if(hasHitHole)
            return true;

         // creates the new 4 configurations and checks if they're feasible
         configuration = createConfiguration(game.ballPosition.add(new Vector(0, 1)), game.ballPosition, );
         if(isConfigurationPossible(configuration)) {
            nextConfigurations.enqueue(configuration);
         }
         configuration = createConfiguration(game.ballPosition.subtract(new Vector(0, 1)), game.ballPosition, );
         if(isConfigurationPossible(configuration)) {
            nextConfigurations.enqueue(configuration);
         }
         configuration = createConfiguration(game.ballPosition.add(new Vector(1, 0)), game.ballPosition, );
         if(isConfigurationPossible(configuration)) {
            nextConfigurations.enqueue(configuration);
         }
         configuration = createConfiguration(game.ballPosition.subtract(new Vector(1, 0)), game.ballPosition, );
         if(isConfigurationPossible(configuration)) {
            nextConfigurations.enqueue(configuration);
         }
      }
   }

   return false;
}