const obj = {
	name: 'Ihor',
	age: 39,
	job: 'Fullstack'
}

const entries = [
	['name', 'Ihor'],
	['age', 39],
	['job', 'Fullstack']
]

console.log(Object.entries(obj)); // convert obj to entries
console.log(Object.fromEntries(entries)); // convert entries to obj

const map = new Map(entries);
console.log(map);
console.log(map.get('age')); // 39

map.set('newField', 42)
	.set(obj, 'Value of obj');
console.log(map);
console.log(map.get(obj));

map.delete('job'); // true
console.log(map.has('job')); // false
console.log(map.size); // 4
// map.clear();
// console.log(map.size); // 0

for (let entry of map.entries()) {
	console.log(entry);
}
for (let [key, value] of map.entries()) {
	console.log(key);
}
for (let value of map.values()) {
	console.log(value);
}
for (let key of map.keys()) {
	console.log(key);
}

map.forEach((value, key, map) => {
	console.log(value, key);
})

const arr = [...map];
const arr2 = Array.from(map); // the same
console.log(arr);

const mapObj = Object.fromEntries(map.entries()); // If we have object fields
console.log(mapObj);

// Example -----------------------------------------------------------------------------------------------------------

const users = [
	{
		name: 'Elena'
	},
	{
		name: 'Alex'
	},
	{
		name: 'Irina'
	},
]

const visits = new Map();
visits
	.set(users[0], new Date())
	.set(users[1], new Date(new Date().getTime() + 1000 * 60))
	.set(users[2], new Date(new Date().getTime() + 5000 * 60));
console.log(visits);

function lastVisit(user) {
	return visits.get(user);
}
console.log(lastVisit(users[1]));

// SET -------------------------------------------------------------------------------------------------------------------------------
// 20^42
