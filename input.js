/* interface between keyboard events and player movements
 * requires Vector object
 *
 * TODO: only keep tracks of keyCodes and return the most
 * important one with a method
 */

function Input(whereToListen, inputQueue) {
   this.pressedKeys = [];
   this.whereToListen = document.getElementById(whereToListen);
   this.inputQueue = inputQueue;
}

Input.prototype.charFromKeyCode = function (keyCode, value) {
   switch(keyCode) {
      case 87: //W
         return 'w';
         break;
      case 65: //A
         return 'a';
         break;
      case 83: //S
         return 's';
         break;
      case 68: //D
         return 'd';
         break;
      default:
         throw 'Key not used';
   }
}

Input.prototype.versorFromPressedKey = function(pressedKey) {
   switch(pressedKey) {
      case 'w':
         return new Vector(0, -1);
         break;
      case 's':
         return new Vector(0, 1);
         break;
      case 'a':
         return new Vector(-1, 0);
         break;
      case 'd':
         return new Vector(1, 0);
         break;
   }
}

Input.prototype.updateOnKeyDown = function(keyCode) {
   try {
      var pressedKey = this.charFromKeyCode(keyCode);
   } catch (e) { //trigger by a non interesting key
      return;
   }

   console.log('KEYDOWN: ' + pressedKey);

   if(this.pressedKeys[pressedKey] !== true) {
      try {
         this.inputQueue.enqueue(pressedKey);
      } catch(e) { //queue full
         return;
      }
   }
   this.pressedKeys[pressedKey] = true;
}

Input.prototype.updateOnKeyUp = function(keyCode) {
   try {
      var pressedKey = this.charFromKeyCode(keyCode);
   } catch (e) { //triggered by a non interesting key
      return;
   }

   console.log('KEYUP: ' + pressedKey);

   this.pressedKeys[pressedKey] = false;
}

Input.prototype.addListeners = function() {
   this.whereToListen.addEventListener('keydown', function(e) {
      e = e || window.event;
      this.updateOnKeyDown(e.keyCode);
      //can't use e.key not supported on Chrome
   }.bind(this), false);

   this.whereToListen.addEventListener('keyup', function(e) {
      e = e || window.event;
      this.updateOnKeyUp(e.keyCode);
   }.bind(this), false);
}

//interface to the inputs logic
Input.prototype.getMovements = function() {
   try {
      var pressedKey = this.inputQueue.dequeue();
   } catch(e) { //queue empty, no movement
      return new Vector(0, 0);
   }

   this.pressedKeys[pressedKey] = false;
   return this.versorFromPressedKey(pressedKey);
}