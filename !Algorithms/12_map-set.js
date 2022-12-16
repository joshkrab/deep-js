// MAP -----------------------------------------------------------------------------------------------

const map = new Map();

map.set('name', 'Ihor');
console.log(map);

const objKey = { id: 55 };
map.set(objKey, 123);
console.log(map);
console.log(map.get(objKey));

// SET -----------------------------------------------------------------------------------------------

const set = new Set();

set.add(5);
set.add(2);
set.add(5);
set.add(3);
set.add(5);
console.log(set);