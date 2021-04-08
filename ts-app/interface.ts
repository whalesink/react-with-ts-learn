interface Person {
	name: string;
	age: number;
	// 属性名称后加?则表示可选属性
	gender?: string;
	// 属性名称前加 readonly 表示只读属性，对象创建后不可以修改
	readonly id: number;
}

let zhangSan: Person = {
	// 对象成员 类型不匹配/缺失/多余 都将引发报错
	name: "zhang",
	age: 33,
	id: 123,
};

// 对只读属性的修改会引发报错
zhangSan.id = 222;

// interface同样可以描述函数
interface IPlus {
	// 函数具有两个形参，依次是数值和数值，返回值类型是数值；
	(a: number, b: number): number;
}

function plus(e: number, c: number): number {
	return e + c;
}

// 函数a符合接口的描述
const a: IPlus = plus;

// 函数b不符合接口描述，会报错
const b: IPlus = function (a: number, b: string) {
	return a + b;
};
