// Створення об'єкта по іншому: first argument its prototype
const person = Object.create({
	// Write method in prototype:
	calculateAge() {
		console.log('Age', new Date().getFullYear() - this.birthday);
	}
}, {
	name: {
		value: 'Ihor',
		enumerable: true,
		writable: true, // We can set other value
		configurable: true, // We can remove key
	},
	birthday: {
		value: 1983
	},
	age: {
		get() {
			// return 'Hello' // What in output
			return new Date().getFullYear() - this.birthday;
		},
		set(value) {
			document.body.style.background = 'red';
			console.log('Set age:', value);
		}
	}
});

console.log(person);
// person.age = 55;
console.log(person.age);
person.calculateAge();

person.name = 'Maxim';
// delete person.name;

for (let key in person) {
	// Check - if key in object, not in prototype
	if (person.hasOwnProperty(key)) {
		console.log('Key:', key, person[key]); // Nothing to output if enumerable: false (default)
	}
	
}
// console.log(person);