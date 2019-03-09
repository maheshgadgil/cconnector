var events = require('events');
var eventEmitter = new events.EventEmitter();

var func1 = function func1() {
	console.log('inside func1');
}
var func2 = function func2(data) {
	console.log('inside func2');
	console.log(data);
}
eventEmitter.on('event1', func1);
eventEmitter.once('event2', func2);

eventEmitter.emit('event1');
eventEmitter.emit('event2', 'abcd');
eventEmitter.emit('event1');
eventEmitter.emit('event2');
