// 函数声明
function increase(a: number, b: number, c: number = 10): number {
	if (typeof c === "number") {
		return a + b + c;
	}

	return a + b;
}

let res = increase(2, 3);

// 函数表达式
const add = function (a: number, b: number, c?: number): number {
	if (typeof c === "number") {
		return a + b + c;
	}

	return a + b;
};

// js
// const add2 = add;

// 注意不是ES6的箭头函数，仅仅是类型声明！
const add2: (a: number, b: number, c?: number) => number = add;

// tsc会在没有明确声明类型时，根据变量的使用情况推断其类型
let a = 1;
// a = "asd"; // 引发类型错误
