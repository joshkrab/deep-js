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
