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