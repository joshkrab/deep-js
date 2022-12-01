const graph = {};
graph.a = { b: 2, c: 1 };
graph.b = { f: 7 };
graph.c = { d: 5, e: 2 };
graph.d = { f: 2 };
graph.e = { f: 1 };
graph.f = { g: 1 };
graph.g = {};

function shortRoute(graph, start, end) {
	const costs = {}; // таблиця найкоротших шляхів
	const processed = []; // вже перевірени вузли
	const neighbors = {}; // сусідні вершини поточного вузла

	// Треба заповними таблицю - найближчі вузли значеннями, а інші безкінечністю.
	Object.keys(graph).forEach(node => {
		if (node !== start) {
			let value = graph[start][node];
			costs[node] = value || 100000000;
		}
	});
	console.log(costs);
}
shortRoute(graph, 'a', 'g')