function one (fn) {
	return fn ? fn(1) : 1;
}
function two (fn) {
	return fn ? fn(2) : 2;
}
function three (fn) {
	return fn ? fn(3) : 3;
}
function four (fn) {
	return fn ? fn(4) : 4;
}
function five (fn) {
	return fn ? fn(5) : 5;
}
function six (fn) {
	return fn ? fn(6) : 6;
}
function seven (fn) {
	return fn ? fn(7) : 7;
}
function eigtht (fn) {
	return fn ? fn(8) : 8;
}
function nine (fn) {
	return fn ? fn(9) : 9;
}

function plus (a) {
	return (b) => a + b;
}
function minus (a) {
	return (b) => a - b;
}
function divide (a) {
	return (b) => a / b;
}
function mult (a) {
	return (b) => a * b;
}
console.log(nine(plus(two())));
console.log(four(mult(one())));
console.log(three(minus(five())));
console.log(six(divide(seven())));
console.log(eigtht(divide(four())));
