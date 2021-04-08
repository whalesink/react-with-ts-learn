const hello = (name: string) => {
	return `hello ${name}`;
};

// 基础类型声明
let isShow: boolean = false,
	age: number = 11,
	binaryNumber: number = 0b1111,
	firstName: string = "zhang",
	message: string = `hello, ${firstName} age is ${age}`,
	u: undefined = undefined,
	n: null = null;

// 将引发类型错误
// age = "zz";

// 任意类型 any types
let notSure: any = 0;

notSure = "a";
notSure = true;

// 联合类型 Union types
let numORstr: number | string = 12;
numORstr = "aaa";

// 数组
let arrOFnumbers: number[] = [0, 1, 2, 3];

arrOFnumbers.push(5);
// 调用其方法也会引发类型检查
// arrOFnumbers.push("str");

// 元组
let user: [string, number] = ["zhang", 1];
