var GAMEFIELD_SIDE = 10;

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
   sketcher = new Sketcher(GAMEFIELD_SIDE, 'gameField', 'box');

   var buttons = {};
   buttons.player = document.getElementById('player');
   buttons.ball = document.getElementById('ball');
   buttons.hole = document.getElementById('hole');
   buttons.rock = document.getElementById('rock');
   buttons.reset = document.getElementById('reset');
   buttons.save = document.getElementById('save');

   var pressedButton = null;

   function releaseButton(button) {
      button.className = button.className.replace('pressed', '');
      button.removeAttribute('pressed');
      pressedButton = null;
   }

   function clickButton(button) {
      if(button.hasAttribute('pressed')) {
         releaseButton(button)
      } else {
         if(pressedButton) releaseButton(pressedButton);
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

   grid = sketcher.getGrid();
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
      var creatorNickname = document.getElementById('creatorNickname').value;
      var queryString = 'levelObject=' + JSON.stringify(levelObject) + '&levelName=' + levelName + '&creatorNickname=' +creatorNickname;
      buttons.save.className = 'button disabled';
      ajaxRequest('insertLevel.php', 'GET', queryString, function() { buttons.save.className = 'button gray';});
   });
}