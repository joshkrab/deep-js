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
    this.color = obj.color // Якби додаємо до конструктора батьківського класу
  }

  // Додали метот поточному класу, інакче буде визиватись цей метод у батьківського
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

// Приклад 2 ------------------------------------------------------------------------------------------------

class Component {
  constructor(selector) {
    // .$el - просто ім'я властивості для дом елемента:
    this.$el = document.querySelector(selector)
  }

  hide() {
    this.$el.style.display = 'none'
  }

  show() {
    this.$el.style.display = 'block'
  }
}

class Box extends Component {
  constructor(options) {
    super(options.selector)

    this.$el.style.width = this.$el.style.height = options.size + 'px'
    this.$el.style.background = options.color
  }
}

const box1 = new Box({
  selector: '#box1',
  size: 100,
  color: 'red'
})

const box2 = new Box({
  selector: '#box2',
  size: 120,
  color: 'blue'
})

class Circle extends Box {
  constructor(options) {
    super(options)

    this.$el.style.borderRadius = '50%'
  }
}

const c = new Circle({
  selector: '#circle',
  size: 90,
  color: 'green'
})

// Інкапсуляція - упаковка, приховання даних від прямого доступу зовні. 
// Наприклад ми створюємо локальну змінну всередині функції конструктора і можемо її змінити тільки, 
// якщо аргумент пришедший в сетер відповідає нашим умовам, 
// тобто ми контролюємо зміну локальної(прихованої) змінної

function User (name, age) {
    this.name = name;
    var _age = age; // локальна змінна
    this.displayInfo = function(){
        document.write("Имя: " + this.name + "; возраст: " + _age + "<br>");
    };
    this.getAge = function() {
        return _age;
    }
    this.setAge = function(age) {
        if(typeof age === "number" && age >0 && age<110){
            _age = age; // змінюємо локальну змінну при виконанні умов
        } else {
            console.log("Недопустимое значение");
        }
    }
}