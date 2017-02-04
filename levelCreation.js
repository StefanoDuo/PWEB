var GAMEFIELD_SIDE = 10;


function start() {
   sketcher = new Sketcher(GAMEFIELD_SIDE, 'gameField');

   var playerBox = document.getElementById('playerBox');
   var ballBox = document.getElementById('ballBox');
   var holeBox = document.getElementById('holeBox');
   var rockBox = document.getElementById('rockBox');
   var resetBox = document.getElementById('resetBox');

   var isBoxPressed = {
      player : false,
      ball : false,
      hole : false,
      rock : false
   };
   /*
   var isPlayerBoxPressed = false;
   var isBallBoxPressed = false;
   var isHoleBoxPressed = false;
   var isRockBoxPressed = false;
   */

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
   })


   var grid = sketcher.getGrid();
   for(var i = 0; i < grid.length; i++)
      for(var j = 0; j < grid[i].length; j++)
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
            console.log(this.className);

            sketcher.drawBoxById(this.id, this.className === 'box' ? whichBox : '');
         })
}