var queue = new Queue();

for(var i=0; i<10; i++) {
	queue.enqueue(i);
	console.log('ENQUEUED:' + i);
}

console.log(' ');

for(var i=0; i<5; i++) {
	console.log('DEQUEUED:' + queue.dequeue());
}

console.log(' ');
console.log('ENQUEUED: uno');
queue.enqueue('uno');
console.log('ENQUEUED: due');
queue.enqueue('due');

console.log(' ');

for(var i=0; i<8; i++) {
	console.log('DEQUEUED :' + queue.dequeue());
}