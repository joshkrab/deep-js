function cashFunction (fn) {
  const cash = {};
  return function (n) {
    if (cash[n]) {
      console.log('From cash: ', cash[n]);
      return cash[n];
    }
    cash[n] = fn(n);
    console.log('From func ', cash[n]);
    return cash[n];
  };
};

function factorial (n) {
  let result = 1;
  while (n !== 1) {
    result *= n;
    n--;
  }
  return result;
}
// console.log(factorial(5));

const cashFactorial = cashFunction(factorial);

cashFactorial(5);
cashFactorial(4);
cashFactorial(3);
cashFactorial(3);
cashFactorial(4);
cashFactorial(5);
cashFactorial(6);
cashFactorial(6);
