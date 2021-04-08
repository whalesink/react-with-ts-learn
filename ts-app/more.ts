// 类型别名 type aliases
// 定义这样一个求和函数
// 如果需要重复使用到他的类型，可以把类型描述存为一个‘变量’方便取用
function sum(x: number, y: number): number {
	return x + y;
}

// 我们单独抽离了对类型的具体描述
type PlusType = (x: number, y: number) => number;

// 显式定义sum2的类型
const sum2: PlusType = sum;

// 定义一个函数类型，返回string
type NameResolver = () => string;

// 定义一个string类型或上面的类型
type NameOrResolver = string | NameResolver;

function getName(n: string | NameOrResolver): string {
	// 若入参为字符串，则返回参数；若为函数，则返回调用结果
	if (typeof n === "string") {
		return n;
	} else {
		return n();
	}
}

// 类型断言 type assertion
// 使用场景：你比编译器更了解当前变量的类型，这时它不应该产生编译错误
function getLength(input: string | number): number {
	// 使用关键字 as 将input的类型手动断言为string
	// 注意as 后是 interface而不是类型
	const str = input as String;
	const number = input as Number;

	// 断言后可以使用其基类的静态属性
	if (str.length) {
		return str.length;
	} else {
		return number.toString().length;
	}
}

// 类型断言的简便写法
// 上面的函数先定义了断言，然后存入了变量中，下面使用简便的写法等效替代
function getLength2(input: string | number): number {
	if ((<string>input).length) {
		// <>尖括号这种写法在结合JSX后会带来解析上的麻烦，因此TS在.tsx文件中禁用了使用尖括号的类型断言。
		return (<string>input).length;
	} else {
		return (<number>input).toString().length;
	}
}
