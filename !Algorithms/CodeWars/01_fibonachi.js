// 1, 1, 2, 3, 5, 8, 13, 21

// f(n) = f(n-1) + f(n-2)

function fibonachi (n) {
	if (n <= 0) {
		return 0;
	}

	if (n <= 2) {
		return 1;
	}

	return fibonachi(n - 1) + fibonachi(n - 2);
}

console.log(fibonachi(4)); // f(3) + f(2) --> 1 + 1 + 1
console.log(fibonachi(6)); // f(5) + f(4) --> ( f(4)+f(3) ) + ( f(3)+f(2) ) -- > ...

function iterationFibonachi (n) {
	if (n <= 0) return 0;
	if (n <= 2) return 1;

	const mySolve = [];

	for (let i = 0; i <= n + 1; i++) {
		if (i < 2) {
			mySolve.push(1);
		} else {
			mySolve.push(mySolve[i - 1] + mySolve[i - 2]);
		}
	}
	console.log(mySolve);
	return mySolve[n + 1];
}

console.log(iterationFibonachi(6));
