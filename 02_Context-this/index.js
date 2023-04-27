// Відео, що треба перед реактом: ---------------------------------------------------------------------------------------------------------------------------------

const univer = {
	'Социологія': 5,
	'Етіка': 4,
	'Філософія': 2,
};

// Кіріліця то паганий кейс, але жс то дозволяє, та моємо то знати
univer['Фізіка'] = 5;
univer.Хімія = 5;
console.log(univer);

const za4etka = [3, 4, 5];
// za4etka = [5, 5, 5]; // Помилка, тому, що константа

// Але так норм:
za4etka[0] = 5;

// import, export, модульність ----------------------------------------------------------------------------------------------------------------
// import otmazka6 from './drug.js'; // визове помилку якщо не додати в хтмл в атрібути script type="module"

// Тепер ми використовуємо цю функцію:
// console.log(otmazka6('Kata'));

// Якщо експорт не default, а іменований - в цьому файлі екпортується дві функції:
// Тут вже імена мають співпадати з іменами функцій, хоча автор каже що не мають, мабуть змінили вимоги
// import { checkLS, showMessage } from './cookies.js'; // додаємо розширення вручну, краще робити

// if (!checkLS()) console.log(showMessage('Problem'));

// Стрілочні функції ---------------------------------------------------------------------------------------------------------------------------

// function fName() {}

document.querySelector('.out-2').onclick = () => console.log('show click');
// Спрощення написання, але не аналог звичайної
// Якщо один рядок після => то можна не писати слово return
const a1 = () => 2 * 2;
console.log(a1()); // 4

// spread & rest -------------------------------------------------------------------------------------------------------------------------------
// Оператор спред ... дозволяє розкласти масив на окремі значення
const normalWork = ['engineer', 'businessman', 'turner'];

// Оператор spread створив масив з елементів normalWork + введені
const workers = [...normalWork, 'guitarPlayer', 'drummer'];
console.log(workers);

// Для об'єктів працює так само:
const worker = {
	'name': 'Alex',
	'job': 'blohher',
};

const macDuk = {
	...worker,
	'position': 'clean manager',
};
console.log(macDuk);

const arrFromObj = [];
for (let key in worker) {
	arrFromObj[key] = worker[key];
}
console.log(arrFromObj);

// rest - коли не знаємо скільки аргументів треба ---------------------------------------------------------------------
const numK = (...args) => args; // робить масив з аргументів
console.log(numK(1, 2));
console.log(numK(1, 6, 789, 987, 2)); // визиваємо з будьякою кількістю аргументів

// Деструктуризація ----------------------------------------------------------------------------------------------------------------------------------------
const arrR = [33, 44, 55, 66, 77];
const [d1, , d2] = arrR; // 33 55
console.log(d1, d2);

const { name, position } = macDuk; // Кажемо взяти name та position із macDuk
console.log(name, position);

// Що буде у консолі? 11разів по 11 - типу відправляє у стек, а потім коли виводить там завжди 11?
// for (var i = 0; i <= 10; i++) {
// 	setTimeout(() => console.log(i), 0);
// }
// Якщо лет, то завжди нова змінна, а вар це одна змінна у віндоу
// for (let i = 0; i <= 10; i++) {
// 	setTimeout(() => console.log(i), 0);
// }

// Про контекст -------------------------------------------------------------------------------------------------------------------------------------

// this - спеціальне ключове слово, що вказує на поточний контекст:
// В данному випадку this повертає глобальний об'єкт window зі своїми методами тощо...
function hello22() {
	console.log('HEllo', this);
}
hello22();
window.hello22(); // Те саме виведе

const person = {
	name: 'Ihor',
	age: 77,
	sayHello: hello22,
	sayHelloWindow: hello22.bind(this), // Вказали інший контекст віндоу
	logInfo: function (job, phone) {
		// Створюємо функцію в контексті цього об'єкта
		console.group(`${this.name} info:`); // Заголовок у консолі, не по темі контексту, просто жс
		console.log(`Name is ${this.name}`);
		console.log(`Age is ${this.age}`);
		console.log(`Job is ${job}`);
		console.log(`Phone is ${phone}`);
		console.groupEnd();
	},
};
console.log(person.sayHello()); // this виведе вже поточний об'єкт person
console.log(person.sayHelloWindow); // this виведе вже не поточний об'єкт person, а вказаний window

// Коли ми пишемо this, то ми вказуємо якого об'єкта властивість ми викликаємо
// Тобто що зліва від крапки window.hello22(); або person.sayHello();
// Тобто в контексті якого об'єкта ми знаходимось

const lena = {
	name: 'Elena',
	age: '23',
};

const gena = {
	name: 'Gena',
	age: '29',
};

person.logInfo.bind(lena)('Babe', 12345);
person.logInfo.bind(lena, 'Babe', 12345)(); // Можна передавати параметри в bind()

person.logInfo.call(gena, 'Frontend', '9-000-12345'); // Call одразу визиває функцію без других ()
person.logInfo.apply(gena, ['Frontend', '9-000-12345']); // Apply одразу визиває функцію, але аргументи приймає у масиві
//-------------------------------------------------------------------------------------------------------------------------------------------

const array = [1, 2, 3, 4, 5];
function umnogit(arr, n) {
	return arr.map(function (item) {
		return item * n;
	});
}
console.log(umnogit(array, 5));

// Записуєм метод в прототип для цієї задачи. Наприклад для співбесід:
Array.prototype.multBy = function (n) {
	return this.map(function (item) {
		return item * n;
	});
};
// Тобто ми визиваємо метод з прототипа, але в контексті поточного об'єкта array
console.log(array.multBy(2));

//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
var name2 = 'Pete';
const ihor = {
	name2: 'Ihor',
	age: 77,
	saySomthing: function () {
		function sayHello() {
			console.log(this);
			return this.name2 + ' say hello';
		}
		return sayHello();
	},
};

var name3 = 'Alex';
const ihor2 = {
	name3: 'Ihor',
	age: 77,
	saySomthing: function () {
		const con = this; // Передаємо поточний контекст (об'єкт ihor2) глибше далі, тому що в цій функції не знайде name3, та візьме у віндоу
		function sayHello() {
			return con.name3 + ' say hello';
		}
		return sayHello();
	},
};
console.log(ihor2.saySomthing()); // 'Ihor/Alex say hello'
