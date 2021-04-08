function echo1(arg: any) {
	return arg;
}

// 类型变量T也遵循标识符定义规范，写为T只是习惯上这么做
function echo<T>(arg: T): T {
	return arg;
}

const str: string = "str";
const res2 = echo(str);

// 交换两个数组元素
// 不使用泛型会丧失类型
function swap(tuple) {
	return [tuple[1], tuple[0]];
}

// 使用泛型会保有类型推断，同时可以直接调用实例的方法
function swapGeneric<T, U>(tuple: [T, U]): [U, T] {
	return [tuple[1], tuple[0]];
}

const result2 = swapGeneric(["string", 0.123]);

// 明确第一个元素会是数值，而第二个元素会是字符串
result2[0].toFixed(2);
result2[1].toLocaleUpperCase();

// 约束泛型
function echoWithArray<T>(arg: T[]): T[] {
	// 这样只能传入数组，不能传入字符串等同样具有length属性的值
	console.log(arg.length);
	return arg;
}

// 某些编程规范要求接口以大写I作为前缀
interface IWithLength {
	length: number;
}

function echoWithLength<T extends IWithLength>(arg: T): T {
	console.log(arg.length);
	return arg;
}

// 只要包含length属性且为数值  均不会报错
const str1 = echoWithLength("str");
const obj = echoWithLength({ length: 10, width: 10 });
const arr2 = echoWithLength([]);

// 泛型类
// 我们想要定义一个类，能实现被push入的队列元素与pop出的元素的类型一致
class Queue<T> {
	private data = [];
	push(item: T) {
		return this.data.push(item);
	}

	pop(): T {
		return this.data.pop();
	}
}

// 泛型类实例化时要指定具体的类型
const queue = new Queue<number>();

queue.push(1);
queue.push("str"); // Error: 类型“string”的参数不能赋给类型“number”的参数。

// 泛型接口
interface KeyPair<T, U> {
	key: T;
	value: U;
}

// 泛型接口描述的对象，同样需要满足类型要求
let kp1: KeyPair<number, string> = { key: 123, value: "str" };
let kp2: KeyPair<string, number> = { key: "test", value: 123 };

let arr: number[] = [1, 2, 3];
let arr1: Array<number> = [1, 2, 3];

// 描述函数的泛型接口
interface IPlus<T> {
	// 函数应具有两个形参，和一个返回值，它们的类型相同
	(a: T, b: T): T;
}

function plus(a: number, b: number): number {
	return a + b;
}

function concat(a: string, b: string): string {
	return a + b;
}

// 函数a、b均符合接口定义
const a: IPlus<number> = plus;
const b: IPlus<string> = concat;

// Error: 参数类型不兼容
const c: IPlus<number> = concat;
