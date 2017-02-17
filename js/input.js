/* interface between keyboard events and player movements
 *
 * whereToListen: id of the element where the EventListener will be attached
 * inputQueue: dependency injection, shows that the queue object is a dependency
 *    and leaves the creation of the object to who's using the Input object
 * translator: map between keyCodes and their meaning in the application
 *
 * pressedKeyCodes: tracks the currently pressed keyCodes
 *
 * DEPENDENCIES: Vector, Queue objects
 */

function Input(whereToListen, inputQueue, translator) {
   this.pressedKeyCodes = {};
   this.whereToListen = document.getElementById(whereToListen);
   this.inputQueue = inputQueue;
   this.translator = translator;
}

Input.prototype.getPressedKeyCodes = function() {
   return this.pressedKeyCodes;
}

Input.prototype.getPressedTranslations = function() {
   if(!this.translator)
      throw 'Input must be initialized with a translator to use this functionality';
   var pressedTranslations = this.getPressedKeyCodes().map(function(currentValue) {
      return this.translator[currentValue];
   });
   return pressedTranslations;
}

Input.prototype.getPriorityKeyCode = function() {
   return this.inputQueue.dequeue();
}

Input.prototype.getPriorityTranslation = function() {
   if(!this.translator)
      throw 'Input must be initialized with a translator to use this functionality';
   return this.translator[this.getPriorityKeyCode()];
}

/* only 3 states are possible:
 * 1) first time the key has been pressed
 *    => pressedKeyCodes[keyCode] == undefined
 *       => !pressedKeyCodes[keyCode] == true
 *           => keyCodes enqueued, pressedKeyCodes[keyCode]=true, and it will never be undefined
 * 2) pressedKeyCodes[keyCode] == true
 *    => nothing happens
 * 3) pressedKeyCodes[keyCode] == false
 *    => keyCodes enqueued, pressedKeyCodes[keyCode]=true
 */
Input.prototype.updateOnKeyDown = function(keyCode) {
   // console.log('KEYDOWN: ' + keyCode);
   if(!this.pressedKeyCodes[keyCode]) {
      this.inputQueue.enqueue(keyCode);
      this.pressedKeyCodes[keyCode] = true;
   }
}

Input.prototype.updateOnKeyUp = function(keyCode) {
   // console.log('KEYUP: ' + keyCode);
   this.pressedKeyCodes[keyCode] = false;
}

Input.prototype.addListeners = function() {
   // have to bind the callback function otherwise
   // this refers to the whereToListen dom element
   this.whereToListen.addEventListener('keydown', function(e) {
      e = e || window.event;
      this.updateOnKeyDown(e.keyCode.toString());
      //can't use e.key not supported on Chrome
   }.bind(this), false);

   this.whereToListen.addEventListener('keyup', function(e) {
      e = e || window.event;
      this.updateOnKeyUp(e.keyCode.toString());
   }.bind(this), false);
}