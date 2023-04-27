// Коли пишемо {} то це спрощений спосів створення об'єкта, замість = new Object({})
// При створенні об'єкту, туди також записується прототип головного JS класа Object,
// з методами, які ми можемо використовувати

// Прототип - об'єкт батьківської сутності, об'єкт батьківського елемента

const person = {
	name: 'Maxim',
	age: 25,
	greet: function () {
		console.log('Greet!');
	},
};

// Якщо визвати метод до нашого об'єкта, якого наче немає в складі:
console.log(person.toString());

// Дивимся об'єкт - бачимо додаткову властивість prototype: посилання на прототип об'єкта
// Це умовний батько нашого об'єкта
// Розкривши ми бачимо багато методів
// Якщо метод/властивість на знаходиться в поточному об'єкті, то далі шукається в прототипі
console.log(person);

// Ми можемо звернутись до глобального класу Object, в його прототип, та додати там нові властивості:
Object.prototype.sayHello = () => console.log('Hello!');

// Тепер ми можемо визвати цей метод у будь якого об'єкта, наприклад у нашего об'єкта person:
person.sayHello();

// Тобто ми розширили базовий прототип класа Object - додали в нього новий метод

// Створюємо об'єкт прототип для об'єкта lena
const lena = Object.create(person);
lena.greet();
console.log(lena);
// Тобто ми створили пустий об'єкт lena === {}, в прототипі першого рівня ми бачимо властивості об'єкту person
// А в прототипі другого рівня, ще глибше, бачимо глобальний об'єкт Object з методами

lena.name = 'Elena'; // Додали властивість в пустий об'єкт lena
console.log(lena);
lena.sayHello(); // Визиваємо функцію з прототипа прототипа об'єкта :)

// Прототип - батьківський об'єкт, працює по ланцюгу прототипів - шукає по вкладеності вглиб по прототипах,
// якщо нема, тоді помилка.

// В JS все є об'єктами:
const str = 'I am string!';
// Якщо в консолі написати str. то після крапки ми бачимо варіанти методів об'єкта
// Тобто за кулісами відбувається приблизно таке:
const string = new String('I am string!');
console.log(string);
console.log(typeof string);
// Так ми вже бачимо як об'єкт, з першим прототипом String, та вкладеним прототипом Object
string.sayHello(); // Приклад зручного успадкування (наследования)

// Тобто ми можемо записати в глобальний об'єкт Object якусь властивість або метод,
// та звертатися до них з будь якого об'єкта, дуже зручно.
