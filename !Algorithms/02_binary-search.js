// Works only with a sorted array.
const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let count = 0;

function binarySearch(array, item) {
	let start = 0;
	let end = array.length;
	let middle;
	let found = false;
	let position = -1;
	while (found === false && start <= end) {
		middle = Math.floor((start + end) / 2); // rounding down
		count += 1;
		if (array[middle] === item) {
			found = true;
			position = middle;
			return position;
		}
		if (item < array[middle]) {
			end = middle - 1;
		} else {
			start = middle + 1;
		}
	}
	return position;
}
console.log(binarySearch(array, 4));
console.log(count);

// algorithm complexity O(log2N), N - number of iterations and length of array
// log 2 16 = 4; 4^2=16; or 16 / 2 - 4 times;

// This algorithm with recursion:
let countR = 0;
function binaryRecSearch(array, item, start, end) {
	countR += 1;

	let middle = Math.floor((start + end)/2);
	if (array[middle] === item) {
		return middle;
	}
	if ( item < array[middle]) {
		return binaryRecSearch(array, item, start, middle - 1);
	}
	if (item > array[middle]) {
		return binaryRecSearch(array, item, middle + 1, end);
	}
	return null;
}
console.log(binaryRecSearch(array, 122, 0, array.length));   
console.log(countR);