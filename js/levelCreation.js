var GAMEFIELD_SIDE = 10;


// JSON.stringify(javascriptObject) to translate a javascript object into a json one
// JSON.parse(jsonObject) to translate a json object into a javascript one
function retrievePlacedObjects(grid) {
   var mapObjects = {
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
               if(mapObjects[string] !== null) {
                  throw 'multiple player/ball/hole entity in the grid, that is not allowed';
               } else {
               mapObjects[string] = new Vector(j+1, i+1);
               }
            } else {
               mapObjects.rocks.push(new Vector(j+1, i+1));
            }
         }
      }
   }

   return mapObjects;
}


function start() {
   sketcher = new Sketcher(GAMEFIELD_SIDE, 'gameField');

   var playerBox = document.getElementById('playerBox');
   var ballBox = document.getElementById('ballBox');
   var holeBox = document.getElementById('holeBox');
   var rockBox = document.getElementById('rockBox');
   var resetBox = document.getElementById('resetBox');
   var saveBox = document.getElementById('saveBox');

   var isBoxPressed = {
      player : false,
      ball : false,
      hole : false,
      rock : false
   };

   function resetButtons() {
      isBoxPressed.player = false;
      isBoxPressed.ball = false;
      isBoxPressed.hole = false;
      isBoxPressed.player = false;
      playerBox.className = '';
      ballBox.className = '';
      holeBox.className = '';
      rockBox.className = '';
   }

   function clickButton(that) {
      var whichButton = that.textContent.toLowerCase();
      if(!isBoxPressed[whichButton]) {
         resetButtons();
         that.className = 'pressed';
      } else {
         that.className = '';
      }
      isBoxPressed[whichButton] = !isBoxPressed[whichButton];
   }

   playerBox.addEventListener('click', function() {
      clickButton(this);
   });
   ballBox.addEventListener('click', function() {
      clickButton(this);
   });
   holeBox.addEventListener('click', function() {
      clickButton(this);
   });
   rockBox.addEventListener('click', function() {
      clickButton(this);
   });
   resetBox.addEventListener('click', function() {
      for(var i = 0; i < grid.length; i++)
         for(var j = 0; j < grid[i].length; j++)
            sketcher.drawBoxByCoordinates(j, i, '');
   });

   grid = sketcher.getGrid();
   for(var i = 0; i < grid.length; i++) {
      for(var j = 0; j < grid[i].length; j++) {
         grid[i][j].addEventListener('click', function() {
            var whichBox = '';
            if(isBoxPressed.player)
               whichBox = ' player';
            else if(isBoxPressed.ball)
               whichBox = ' ball';
            else if(isBoxPressed.hole)
               whichBox = ' hole';
            else if(isBoxPressed.rock)
               whichBox = ' rock';
            else return;
            sketcher.drawBoxById(this.id, this.className === 'box' || this.className === 'box firstOfRow' ? whichBox : '');
         })
      }
   }

   saveBox.addEventListener('click', function () {
      console.log(retrievePlacedObjects(grid));
      retrievedObjects = retrievePlacedObjects(grid);
      return retrievedObjects;
   });
}









































