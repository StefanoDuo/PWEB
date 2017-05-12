// returns undefined when dequeueing an empty queue
function Queue() {
   this.inbox = [];
   this.outbox = [];
}

Queue.prototype.enqueue = function(value) {
   this.inbox.push(value);
}

Queue.prototype.dequeue = function() {
   if(this.outbox.length == 0)
      while(this.inbox.length > 0)
         this.outbox.push(this.inbox.pop());
   return this.outbox.pop();
}
