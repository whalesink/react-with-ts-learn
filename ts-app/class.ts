class Animal {
	constructor(name: string) {
		this.name = name;
	}

	public name: string;
	static categories: string[] = ["mammal", "bird", "cat", "dog"];

	static isAnimal(x) {
		return x instanceof Animal;
	}

	// 封装：类的实例可以调用类的方法而不用关心具体实现
	run() {
		return `${this.name} is running`;
	}
}

class Dog extends Animal {
	bark() {
		return `${this.name} is barking`;
	}
}

const xiaobao = new Dog("xiaobao");

console.log(xiaobao.run()); // 继承: 子类Dog继承了父类Animal的方法和属性
console.log(xiaobao.bark());

// 静态成员可以直接访问,而不用事先实例化
console.log(Animal.categories);
console.log(Animal.isAnimal(xiaobao));

class Cat extends Animal {
	constructor(name) {
		super(name);
	}

	// 多态：重写父类方法，增强了封装的灵活性
	run() {
		return "Meow, " + super.run();
	}
}

const milk = new Cat("milk");

console.log(milk.run());

// 使用 interface 实现类的成员
interface Radio {
	switchRadio(trigger: boolean): void;
}

interface RadioWithBattery extends Radio {
	checkBatteryStatus();
}

class Car implements Radio {
	switchRadio() {}
}

class SmartPhone implements RadioWithBattery {
	switchRadio() {}
	checkBatteryStatus() {}
}
