/* interface between keyboard events and player movements
 * requires Vector object
 */

function Input(whereToListen) {
   this.isWpressed = false;
   this.isApressed = false;
   this.isSpressed = false;
   this.isDpressed = false;
   /* supports other keybinding for movements
   /* this.isArrowUpPressed = false;
   /* this.isArrowDownPressed = false;
   /* this.isArrowLeftPressed = false;
   /* this.isArrowRightPressed = false;
    */
   this.lastEvent = null;
   this.whereToListen = document.getElementById(whereToListen);

}

Input.prototype.setKeyCode = function (keyCode, value) {
   switch(keyCode) {
      case 87: //W
         this.isWpressed = value;
         break;
      case 65: //A
         this.isApressed = value;
         break;
      case 83: //S
         this.isSpressed = value;
         break;
      case 68: //D
         this.isDpressed = value;
   }
}

Input.prototype.addListeners = function() {
   this.whereToListen.addEventListener('keydown', function(e) {
      e = e || window.event;

      // checks if the key is being held down, if that's
      // the case the browser keeps firing keydown events
      if(this.lastEvent && this.lastEvent.keyCode === e.keyCode)
         return;
      this.lastEvent = e;

      this.setKeyCode(e.keyCode, true);
   }.bind(this), false);

   this.whereToListen.addEventListener('keyup', function(e) {
      e = e || window.event;

      //clears last event
      this.lastEvent = null;

      this.setKeyCode(e.keyCode, false);
   }.bind(this), false);
}

//interface to the inputs logic
Input.prototype.getMovements = function() {
   if(this.isWpressed) {
      return new Vector(0, -1);
   } else if(this.isSpressed) {
      return new Vector(0, 1);
   } else if(this.isApressed) {
      return new Vector(-1, 0);
   } else if(this.isDpressed) {
      return new Vector(1, 0);
   } else
      return new Vector(0, 0);
}