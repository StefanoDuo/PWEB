var GAMEFIELD_SIDE = 10;

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
         //checks the classname of every element in the grid removing the substrings
         //'box', ' ', 'firstOfRow' or any their(?) combination
         string = grid[i][j].className.replace(/box|firstOfRow|\s/g, '');
         if(string !== '') {
            if(string === 'player' || string === 'ball' || string === 'hole') {
               if(levelObject[string] !== null) {
                  throw 'multiple player/ball/hole entity in the grid, that is not allowed';
               } else {
               levelObject[string] = new Vector(j, i);
               }
            } else {
               levelObject.rocks.push(new Vector(j, i));
            }
         }
      }
   }
   return levelObject;
}

function start() {
   var sketcher = new Sketcher(GAMEFIELD_SIDE, 'gameField', 'box');

   var pressedButton = null;
   var buttons = { //remove this if it's not going to be used
      player : document.getElementById('player'),
      ball : document.getElementById('ball'),
      hole : document.getElementById('hole'),
      rock : document.getElementById('rock'),
      reset : document.getElementById('player'),
      save : document.getElementById('save')
   };

   function releaseButton(button) {
      button.className = button.className.replace('pressed', '');
      button.removeAttribute('pressed');
      pressedButton = null;
   }
   function clickButton(button) {
      if(button.hasAttribute('pressed')) {
         // the button is currently pressed we need to release it
         releaseButton(button)
      } else {
         // we need to press the button but first we release the
         // pressed one (if it exists);
         if(pressedButton)
            releaseButton(pressedButton);
         button.setAttribute('pressed', '');
         button.className = button.className.replace(/(red)|(blue)|(green)/, 'pressed$&');
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

   var grid = sketcher.getGrid();
   for(var i = 0; i < grid.length; i++) {
      for(var j = 0; j < grid[i].length; j++) {
         grid[i][j].addEventListener('click', function() {
            if(pressedButton === null) return;
            sketcher.drawBoxById(this.id, this.className.includes(pressedButton.id) ? '' : pressedButton.id);
         })
      }
   }

   buttons.save.addEventListener('click', function () {
      var levelObject = fetchLevelObject(grid);
      var levelName = document.getElementById('levelName').value;
      var creatorNickname = document.getElementById('nickname').firstChild.textContent;
      var queryString = 'levelObject=' + JSON.stringify(levelObject) + '&levelName=' + levelName + '&creatorNickname=' +creatorNickname;
      buttons.save.className = 'button disabled';
      ajaxRequest('insertLevel.php', 'GET', queryString, true, function() { buttons.save.className = 'button gray';});
   });
}