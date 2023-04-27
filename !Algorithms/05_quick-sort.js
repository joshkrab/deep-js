// Recursive factorial
function recFactorial (n) {
  if (n <= 1) {
    return 1;
  }
  return n * recFactorial(n - 1);
}
console.log(recFactorial(5));

// Fibonachi: 1,1,2,3,5,8,13,21...
const fibonachi = (n) => {
  if (n === 1 || n === 2) {
    return 1;
  }
  return fibonachi(n - 1) + fibonachi(n - 2);
};
console.log(fibonachi(7));

// Recursive sort algorithm
const array = [0, 3, 2, 5, 6, 8, 1, 9, 4, 2, 1, 2, 9, 6, 4, 1, 7, -1, -5, 23, 6, 2, 35, 6, 3, 32];
let count = 0;

function quickSort (arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const less = [];
  const bigger = [];
  const middle = Math.floor(arr.length / 2);

  for (let i = 0; i < arr.length; i++) {
    count++;
    if (i === middle) {
      continue;
    }
    if (arr[i] < arr[middle]) {
      less.push(arr[i]);
    } else {
      bigger.push(arr[i]);
    }
  }
  return [...quickSort(less), arr[middle], ...quickSort(bigger)];
}

console.log(quickSort(array));
console.log(count);
// algorithm complexity O(log2N * N)
