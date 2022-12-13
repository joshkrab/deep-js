var a = 10;

function outerFunc(a) {
	function innerFunc() {
		var b = 20;
		console.log(a + b);
	}
	return innerFunc;
}

var func = outerFunc(a);
a = 30;
func();

function arrayRange(a, b) {
	return new Array(b).fill().map(i => a++);
}
console.log(arrayRange(1,4));
console.log(arrayRange(-6,4));

function greetingMsg() {
	console.log(customerName);
};
function greetCustomer() {
	var customerName = 'Andrew';
	greetingMsg()
};
//greetCustomer(); // error