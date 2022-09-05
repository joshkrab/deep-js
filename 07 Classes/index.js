class Animal {
  static type = 'pet';

  constructor(options) {
    this.name = options.name,
    this.age = options.age,
    this.hasTail = options.hasTail
  }

  // Ці методи будуть у прототипі об'єктів, створених через ций клас:
  voice() {
    console.log('I am animal');
  }
}

const animal = new Animal({
  name: 'dog',
  age: 7,
  hasTail: true
});

console.log(animal);
animal.voice();

console.log(Animal.type); // Змінна самого класу, статична

// Створюємо ще клас, яки буде наслідуватися від першого
class Cat extends Animal {
  static type = 'CAT'

  constructor(obj) {
    super(obj); // Визиває конструктор класа батька Animal, інакше помилка
    this.color = obj.color
  }

  voice() {
    super.voice(); // Визове метод батьківського класу
    console.log('I am cat');
  }

  get ageInfo() {
    return this.age * 7
  }

  set ageInfo(newAge) {
    this.age = newAge
  }
}

const cat = new Cat({
  name: 'cat',
  age: 5,
  hasTail: true,
  color: 'black'
});
cat.voice();
console.log(cat);
console.log(cat.ageInfo); // 35

cat.ageInfo = 2; // Задали сетером нове значення
console.log(cat.ageInfo); // 14

// 11 хвилина