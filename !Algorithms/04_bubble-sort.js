// Compare every two adjacent elements
const array = [0, 3, 2, 5, 6, 8, 1, 9, 4, 2, 1, 2, 9, 6, 4, 1, 7, -1, -5, 23, 6, 2, 35, 6, 3, 32];
let count = 0;

function bubbleSort(array) {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length; j++) {
			count++;
			if (array[j] > array[j+1]) {
				let tmp = array[i];
				array[j] = array[j+1];
				array[j+1] = tmp;
			}
		}
	}
	return array;
}

console.log(bubbleSort(array));
console.log(count);

// External cycle only for N times iterations
// algorithm complexity O(N^2)