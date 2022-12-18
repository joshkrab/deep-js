const graph = {};
graph.a = { b: 2, c: 1 };
graph.b = { f: 7 };
graph.c = { d: 5, e: 2 };
graph.d = { f: 2 };
graph.e = { f: 1 };
graph.f = { g: 1 };
graph.g = {};

function shortRoute (graph, start, end) {
  const costs = {}; // таблиця найкоротших шляхів
  const processed = []; // вже перевірени вузли
  let neighbors = {}; // сусідні вершини поточного вузла

  // Треба заповними таблицю - найближчі вузли значеннями, а інші безкінечністю.
  Object.keys(graph).forEach(node => {
    if (node !== start) {
      // якщо є по такий адресі значення, записуємо в змінну.
      const value = graph[start][node];
      // якщо з поточного вузла є такі шляхи тоді записуємо їх значення, якщо нема заповнюємо великим числом.
      // Створюємо властивості всі як і в графі, крім старту, і записуємо або значення або велике число.
      costs[node] = value || 100000000;
    }
  });
  // Ствоили таку таблицю відносто старту:
  console.log(costs);

  // Знаходимо зв'язану вершину з найменьшою вагою:
  let node = findNodeLowestCost(costs, processed); // 'с'
  while (node) {
    const cost = costs[node]; // 1
    neighbors = graph[node]; // { d: 5, e: 2 }

    Object.keys(neighbors).forEach(
      neighbor => {
        const newCost = cost + neighbors[neighbor]; // 1 + (5 or 2)
        // Дописуєм поточну вагу для поточних вузлів { d: 5, e: 2 } в таблиці costs
        if (newCost < costs[neighbor]) {
          costs[neighbor] = newCost;
        };
      });
    processed.push(node);
    node = findNodeLowestCost(costs, processed);
  };
  console.log(costs);
  return costs; // shortest way from start to end
}

function findNodeLowestCost (costs, processed) {
  let lowestCost = 100000000;
  let lowestNode;
  Object.keys(costs).forEach(node => {
    const cost = costs[node];

    if (cost < lowestCost && !processed.includes(node)) {
      lowestCost = cost;
      lowestNode = node;
    }
  });
  return lowestNode;
};

shortRoute(graph, 'a', 'g');
