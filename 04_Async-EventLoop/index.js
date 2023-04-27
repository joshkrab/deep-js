console.log('Start');

window.setTimeout(function () {
	console.log('Timeout worked');
}, 5000); // Метод прийшов з браузного API

function sec2() {
	console.log('2sec');
}

setTimeout(sec2, 2000);

console.log('End');

// Event Loop - безкінечний цикл подій. JS однопоточна мова, але завдяки цьому механізму створює додаткові потоки

// Усі асінхронні операції: setTimeout(), Події кнопок/скрола..., Запити на сервер,
// коли компілятор доходить до них, то вони перемещаються в webAPIs, поток не зупиняється
// і потім по черзі повертаюстся в стек - це черга Callback queue

// Макротаски: SetTimeout, SetInterval, setImmediate(виконається останнім)

// Мікротаски: Promise Callback, async functions (.nextTick() виконається першим)

// Мікро і макро таски це частини Callback queue
// Спочатку виконуються всі мікротаски, потім виконуються макротаскі

// Stack - потік виконання кода JS - в нього попадають таскі по черзі, якщо просто сінхронний код

// Задачі з черги потрапляють в стек тільки коли він порожній - все виконано!

// Heap - пам'ять для зберігання об'єктів та функцій, дінамічне виділення в ОЗУ