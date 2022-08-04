// Коллбэк — це функція, яка повинна бути виконана після того, як інша функція завершила виконання
// ( звітси і назва: callback – функція зворотнього визову )
// Я так розумію: колбек це функція в аргументі, яка виконається коли виконається зовнішня, наприклат тайм-аут

// Робимо емуляцію роботи з сервером:
console.log('Request data...'); // Якоби запит на сервер

// Визиваємо асінхронність - якоби сервер робить запит до БД, робить це за 2 секунди
// setTimeout(() => {
// 	console.log('Preparing data...');

// 	const backEndData = {
// 		server: 'abs',
// 		port: 2000,
// 		status: 'working',
// 	};

// 	setTimeout(() => {
// 		backEndData.modified = true;
// 		console.log('Data received:', backEndData);
// 	}, 2000);
// }, 2000);

// Такий підхід є паганим великою вкладеністю - колбекі всередені колбеків

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
