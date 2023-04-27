function loadScript (src, callback) {
	let script = document.createElement('script');
	script.src = src;

	script.onload = () => callback(null, script); // Запускається колбек, коли скріпт завантажений
	script.onerror = () => callback(new Error(`Помилка завантаження скрипту для ${src}`));

	document.head.append(script);
} // Я так розумію - вся функція виконалась синхронно, але два рядки з неї 2 та 3 виконуються в асінхроні,
// і в асінхроні запуститься колбек.

// loadScript('/my/script.js', function (err, script) {
// 	// колбек запускається після завантаження скрипту
// 	newFunction(); // тож тепер все працює
// });

// Callback in callback -----------------------------------------------------------------------------------------------------------
// Щоб послідовно завантажити два скріпти:
// loadScript('/my/script.js', function (err, script) {
// 	if (err) {
// 		// обробляємо помилку
// 	}

// 	alert(`Круто, ${script.src} завантажився, завантажмо ще один`);

// 	loadScript('/my/script2.js', function (err, script) {
// 		alert(`Круто, другий скрипт завантажився`);
// 	});

// });

// Спосіб без вкладення - кожний колбек викликає наступний крок:
// loadScript('1.js', step1);

function step1 (error, script) {
	if (error) {
		handleError(error);
	} else {
		// ...
		loadScript('2.js', step2);
	}
}

function step2 (error, script) {
	if (error) {
		handleError(error);
	} else {
		// ...
		loadScript('3.js', step3);
	}
}

// Promises --------------------------------------------------------------------------------------------------------------------------

let promise = new Promise(function (resolve, reject) {
	console.log('Проміс старт одразу!');
	// код, котрий виконується одразу при створенні проміму
	// Аргументи resolve і reject – це колбеки які надає нам сам JavaScript.

	// через 1 секундну повідомляється що задача виконання з результатом "завершено"
	setTimeout(() => resolve("Проміс виконано!"), 1000);
	// або
	// через 1 секунду повідомляється що задача виконана з помилкою
	setTimeout(() => reject(new Error("Ооооой помилка!")), 1000);
});

// Функція виконавець запускається автоматично і намагається виконати роботу.
// А потім викликає метод resolve(value) якщо спроба була успішною або reject(error) якщо виникла помилка.

// Стан state: pending --> fulfilled/rejected
// Результат result: undefined --> value/error
// Стан змінююється тільки однин раз, тому після першого resolve/reject наступний код ігнорується

// Метод resolve запустить першу функцію передану в .then
// Відповідно reject другу
// promise
// 	.finally(() => console.log("Проміс завершений - finally")) // пропускає результат далі
// 	.then(
// 		result => console.log(result), // виведе "завершено!" через 1 секунду
// 		error => console.log(error) // не запуститься
// 	) // <-- .then обробляє резульат
// 	.finally(() => console.log("Другий finally"))
// 	.catch(err => alert(err)) // помилка пройде скрізь усі блоки


// при створенні проміс одразу ж перейде в стан успішно завершений (`"resolved"`)
// В цьому промісі так само функція, яка одразу запускає свій перший аргумент.
let fastPromise = new Promise(resolve => resolve("Fast promise resolved!"));
// fastPromise.then(console.log); // виведе "завершено!"

// Promise.resolve(value) // Теж створює вирішений проміс із результатом value.
// Promise.reject(error) // створює проміс, що завершується помилкою error.

function delay (ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}
// delay(3000).then(() => console.log('Виконалось через 3 секунди'));

// Chain of Promises ------------------------------------------------------------------------------------------------------------------
new Promise((resolve) => {
	setTimeout(resolve(1), 1000)
}).then((res) => {
	console.log(res);
	return res + 1;
}).then((res) => {
	console.log(res);
	return res + 1;
}).then((res) => {
	console.log(res);
	return new Promise(resolve => setTimeout(() => {
		resolve(res + 1)
	}, 2000)); // У цьому промісі виконуємо асінхронну дію а наступний .then чекає
}).then(console.log);

new Promise(resolve => resolve(12))
	.then(res1 => {
		new Promise(resolve => resolve(res1 + 12)).then((res2) => res1 + res2).then(console.log)
	})

// response.json() зчитує віддалений контент у форматі JSON
// fetch('/article/promise-chaining/user.json')
// 	.then(response => response.json())
// 	.then(user => alert(user.name)); // iliakan, отримали ім’я користувача

// Errors ----------------------------------------------------------------------------------------------------------------------------------------------------

// new Promise((resolve, reject) => {
// 	resolve("ok");
// }).then((result) => {
// 	console.log('First promise ok');
// 	blabla(); // викликаємо неіснуючу функцію
// }).catch(console.log); // ReferenceError: blabla is not defined

// Прокидання помилок: якщо функція .catch успішно виконана, тоді далі помилка не прокидується:
new Promise((resolve, reject) => {

	throw new Error("Помилка!");

}).catch(function (error) {

	// throw error; // прокидуємо цю або іншу помилку в наступний catch
	console.log("Помилка оброблена, продовжуємо роботу");

}).then(() => console.log("Управління переходить до наступного обробника then"));

// Якщо помилку зовсім не обробляти, буде глобальна помилка в консолі
// Для цього можна використовувати івенти для перехоплення необроблених помилок

// Чи виконається кетч? Відповідь - ні, прихований try..catch обробляє тільки сінхронні помилки.
// new Promise(function (resolve, reject) {
// 	// throw new Error("Whoops!"); // Якщо помилку тут, тоді теж перехопить і спрацює кетч
// 	setTimeout(() => {
// 		throw new Error("Whoops!");
// 		// reject(); // Якщо реджект тоді виконається
// 	}, 1000);
// }).catch(err => console.log('Виконався кетч'));

// Promise API -------------------------------------------------------------------------------------------------------------------------------------------------------------

Promise.all([
	new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
	new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
	new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(console.log); // коли всі проміси виконаються, результат буде [1,2,3]: кожен проміс надає елемент масиву

// В масиві можуть бути не тільки проміси, якщо елемент масиву не проміс, тоді він повертається в результат як є.

// Promise.allSettled(urls.map(url => fetch(url))); - поверне масив усіх результатів
// [
// { status: 'fulfilled', value: ...об’єкт відповіді... },
// { status: 'fulfilled', value: ...об’єкт відповіді... },
// { status: 'rejected', reason: ...об’єкт помилки... }
// ]

// Promise.race - поверне тільки перший результат
// Promise.any - поверне перший успішний результат, або масив помилок в об'єкті error

// Промісифікація -----------------------------------------------------------------------------------------------------------------------------------

// Promisification - перетворення функції, яка приймає колбек та повертає проміс.

// Async/Await -----------------------------------------------------------------------------------------------------------------------------------------------------
// async - функція повертає проміс

async function f () {
	return 1;
}
f().then(console.log); // 1

// await - змушує JavaScript чекати, поки проміс виконається

async function f () {

	let promise = new Promise((resolve, reject) => {
		setTimeout(() => resolve("готово!"), 1000)
	});

	let result = await promise; // чекатиме, поки проміс не виконається (*)

	console.log(result); // "готово!"
}
f();

// Сучасні браузери підтримують await на верхньому рівні, якщо ні, тоді можна використати async
// (async () => {
// 	let response = await fetch('/article/promise-chaining/user.json');
// 	let user = await response.json();
// })();

// Асинхронні методи класів
// Щоб оголосити асинхронний метод класу, просто додайте перед ним async:

class Waiter {
	async wait () {
		return await Promise.resolve(1);
	}
}

new Waiter()
	.wait()
	.then(console.log); // 1 (це те ж саме, що й (result => console.log(result)))