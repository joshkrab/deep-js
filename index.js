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
// func();

function arrayRange(a, b) {
	return new Array(b).fill().map(i => a++);
}
// console.log(arrayRange(1,4));
// console.log(arrayRange(-6,4));

function greetingMsg() {
	console.log(customerName);
};
function greetCustomer() {
	var customerName = 'Andrew';
	greetingMsg()
};
//greetCustomer(); // error

function findEvenIndex(arr)
{
  for(let i=0; i<arr.length; i++){
    let left = 0;
    let right = 0;
    
    for (let j=0; j<arr.length; j++){
      if(j<i){ left += arr[j]};
      if(j>i){ right += arr[j]};
		}
		console.log(left, right);
    if (left === right){
      return i;
    }
  }
  return -1;
}
// console.log(findEvenIndex([1,2,3,4,3,2,1]));
function greet(language) {
	const dataBase = {
    english: 'Welcome',
czech: 'Vitejte',
danish: 'Velkomst',
dutch: 'Welkom',
estonian: 'Tere tulemast',
finnish: 'Tervetuloa',
flemish: 'Welgekomen',
french: 'Bienvenue',
german: 'Willkommen',
irish: 'Failte',
italian: 'Benvenuto',
latvian: 'Gaidits',
lithuanian: 'Laukiamas',
polish: 'Witamy',
spanish: 'Bienvenido',
swedish: 'Valkommen',
welsh: 'Croeso'
  }
  if (dataBase[language]){
    return dataBase[language];
  }
  return 'IP_ADDRESS_NOT_FOUND';
}
console.log(greet('english'));