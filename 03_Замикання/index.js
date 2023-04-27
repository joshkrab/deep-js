console.log('Привіт замикання');

// Функція всередині функції:
function createCalc(n) {
   return function () {
      console.log(100 * n);
   };
}

const calc = createCalc(42);
calc(); // В данному випадку внутришня функція замкнула змінну n, тому ми визиваємо без неї....

function createInc(n) {
   return function (num) {
      return n + num;
   };
}

const addOne = createInc(1); // Замикаємо на значенні 1
const addTen = createInc(10); // Замикаємо на значенні 10
console.log(addOne(10)); // 11
console.log(addTen(10)); // 20

function urlGenerator(domain) {
   return function (url) {
      return `https://${url}.${domain}`;
   };
}
const comUrl = urlGenerator('com');
console.log(comUrl('google'));
console.log(comUrl('netflix'));

// ДЗ ----------------------------------------------------------------------------------------------------------
function logPerson() {
   console.log(`Person: ${this.name}, ${this.age}, ${this.job}`);
}

const person1 = { name: 'Michael', age: 22, job: 'Frontend' };
const person2 = { name: 'Helen', age: 29, job: 'SMM' };

const bind = (context, func) => {
   return function (...args) {
      func.apply(context, args);
   };
};

bind(person1, logPerson);
bind(person2, logPerson);
