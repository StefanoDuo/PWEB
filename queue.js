// TODO: change Queue implementation with the one commented at the bottom

function Queue(size) {
   this.arraySize = size;
   this.array = new Array(size);
   this.front = 0;
   this.back = 0;
}

/* javascript % operator returns a negative value for negative numbers
 * eg. (-3) % 5 === -2, and we want always a positive number to index the array
 */
Queue.prototype.modulus = function(number, mod) {
   return ((number % mod) + mod) % mod;
}

Queue.prototype.isFull = function() {
   if(this.modulus(this.front + 1, this.arraySize) === this.back)
      return true;
   else
      return false;
}

Queue.prototype.isEmpty = function() {
   if(this.front === this.back)
      return true;
   else
      return false;
}

Queue.prototype.enqueue = function(value) {
   if(this.isFull()) throw 'Queue is full';

   this.array[this.back] = value;
   this.back = this.modulus(this.back - 1, this.arraySize);
}

Queue.prototype.dequeue = function() {
   if(this.isEmpty()) throw 'Queue is empty';

   var returnValue = this.array[this.front];
   this.front = this.modulus(this.front - 1, this.arraySize);
   return returnValue;
}


/*
function Queue() {
   this.inbox = [];
   this.outbox = [];
}


Queue.prototype.enqueue = function(value) {
   this.inbox.push(value);
}

Queue.prototype.dequeue = function() {
   while(this.inbox.length > 0)
      this.outbox.push(this.inbox.pop());
   return this.outbox.pop();
}
*/