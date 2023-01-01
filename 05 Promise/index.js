// Коллбэк — це функція, яку ми приймаємо в аргументи і викликаємо в середині.
// ( звітси і назва: callback – функція зворотнього визову )
// Я так розумію: колбек це функція в аргументі, яка виконається коли виконається зовнішня, наприклат тайм-аут


btn.addEventListener('click', () => {
	alert('You clicked me!');

	let pElem = document.createElement('p');
	pElem.textContent = 'This is a newly-added paragraph.';
	document.body.appendChild(pElem);
});
// Асінхронні колбекі - функції прийняті як аргумент, і будуть виконані коли зовнішня функція спрацює в фоні

// Робимо емуляцію роботи з сервером:
console.log('Request data...'); // Якоби запит на сервер
// Визиваємо асінхронність - якоби сервер робить запит до БД, робить це за 2 секунди
setTimeout(() => {
	console.log('Preparing data...');

	const backEndData = {
		server: 'abs',
		port: 2000,
		status: 'working',
	};

	setTimeout(() => {
		backEndData.modified = true;
		console.log('Data received:', backEndData);
	}, 2000);
}, 2000);

// Такий підхід є паганим великою вкладеністю - колбекі всередені колбеків - callback hell

// Пишемо те саме за допомогою промисів:

// Глобальний клас Promise() - строрюємо свій екземпляр;
// Це клас, в конструктор якого нам треба передати колбек фукнцію (в аргумент):

// Аргументи resolve, reject є функціями
// В середині колбека пишемо асинхронний код, беремо для приклада теж тайм-аут
const p = new Promise(function (resolve, reject) {
	setTimeout(() => {
		console.log('Preparing data...');

		const backEndData = {
			server: 'abs',
			port: 2000,
			status: 'working',
		};

		resolve(backEndData); // Кажемо промісу, що він виконаний, передаємо змінну далі по ланцюгу (then())
	}, 2000);
});

// функція resolve виконується коли успішно виконана асінхронна операція

// Тепер наша змінна Р є промісом

// Використовуємо методи проміса:

p.then((data) => {
	console.log('Promise resolved');

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			data.modified = true;
			resolve(data);
			// reject(data); // Імітували помилку - кажемо що проміс не успішно виконався
		}, 2000);
	});
})
	.catch((err) => console.log('Спіймали помилку: ', err))
	.then((clientData) => {
		clientData.fromPromise = true;
		return clientData; // Передаємо по ланцюгу данні, які можемо модифікувати
	})
	.then((data) => console.log('Modified', data))
	.finally(() => console.log('finally()'));

// Метод .catch додаємо в ланцюг куди завгодно - виловити помилку
// Метод finally() спрацює в будь якому випадку

// Інший приклад ----------------------------------------------------------------------------

const sleep = (ms) => {
	return new Promise((resolve) => setTimeout(() => resolve(), ms));
};
sleep(2000).then(() => console.log('After 2 sec'));
sleep(3000).then(() => console.log('After 3 sec'));

// Метод Promise.all([...]) - чекає коли виконається масив промисів, і потім щось виконає
// Наприклад щоб дочекатись різні набори даних і потім їх використовувати
Promise.all([sleep(2000), sleep(3000)]).then(() => {
	console.log('All Promises');
});

// Метод Race() - виконується після виконання першого промісу з масиву
// Наприклад щоб з'ясувати який проміс виконався перший
Promise.race([sleep(2000), sleep(3000)]).then(() => {
	console.log('Race Promises');
});

// Проміси - обгортка для асинхронного коду, для зручності

// .then(()=.{}, ()=>{}) - ferst argument it's resolve, second - reject
// .catch(f) === .then(null, f)
// .finally(func) == .then(func, func) - any function: resolve or reject, state: settled

p.finally(() => 'зупинити індикатор завантаження').then(result => 'вивести результат', err => 'вивести помилку');
// Обробник finally пропускає результат чи помилку до наступних обробників.

// let promise = new Promise(function(resolve, reject) {
//   resolve(1);

//   setTimeout(() => resolve(2), 1000);
// });
// promise.then(alert); // 1

// function delay(ms) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(resolve, ms)
// 	})
// }

// delay(3000).then(() => alert('виконалось через 3 секунди'));

// fetch('/article/promise-chaining/user.json')
//   .then(response => response.json())
//   .then(user => alert(user.name)).catch(err => console.error('Такої адреси немає:', err));

new Promise(function (resolve, reject) {
	setTimeout(() => {
		throw new Error("Whoops!");
	}, 8000);
}).catch(alert);


// https://developer.mozilla.org/ru/docs/Learn/JavaScript/Asynchronous/Introducing ------------------------------------------------------------------------------------

// Не всі колбекі асінхронні, наприклад методи масивів виконують колбек одразу. Ці колбекі не очікують ніяких дій, а виконуються одразу.

// Проміси - більш сучасний синтаксис після колбеків, для асинхроного коду.

// Приклад промісу це метод fetch(), який є сучасною версією апі XMLHttpRequest.

fetch('products.json')
	.then(response => {
		if (!response.ok) {
			throw new Error(`HTTP error: ${response.status}`);
		}
		return response.json();
	})
	.then(json => initialize(json))
	.catch(err => console.error(`Fetch problem: ${err.message}`));

// Проміс - це об'єкт, що представляє асинхронну операцію, виконану вдало чи невдало.
// Кожен .then() блок повертає новий promise. Блоки послідовно виконуються в черзі подій.

// https://developer.mozilla.org/ru/docs/Learn/JavaScript/Asynchronous/Promises ------------------------------------------------------------------------------------------

// async/await - може не підтримуватись в деяких браузерах.

// async - перетворює звичайну функцію асинхронну і результат виклику функції обертає в Promise.

async function hello () {
	return greeting = await Promise.resolve("Hello");
};

hello().then(alert);

// await блокує потік тільки авсередині асінхронной функції

// Подхід fast-async-await:

async function timeTest () {
	const timeoutPromise1 = timeoutPromise(3000);
	const timeoutPromise2 = timeoutPromise(3000);
	const timeoutPromise3 = timeoutPromise(3000);

	await timeoutPromise1;
	await timeoutPromise2;
	await timeoutPromise3;
}
// В даному прикладі ми не блокуємо запись зміних, вони запишуться незалежно одна від іншої
// Нижче ми очікуємо виконання промісів з об'єкта в результат, оскільки вони були запущені одночасно, блокуючи потік, і виконуються одночасно.