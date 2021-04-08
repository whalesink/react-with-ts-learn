let a: number = 123;

const enum Direction {
	Up = a, // 报错
	// 枚举成员为字符串时，其之后的成员也必须是字符串
	Down = "南",
	Left = "西",
	Right = "东",
}

/**
 * 未赋初始值的枚举项会接着上个项的值进行递增；
 * enum 具有双向映射的特点；
 */
console.log(Direction.Up); // 0
console.log(Direction[0]); // "Up"
console.log(Direction);


/**
 * 编译结果
 * 
var Direction;
(function (Direction) {
	Direction[(Direction["Up"] = 0)] = "Up";
	Direction[(Direction["Down"] = 1)] = "Down";
	Direction[(Direction["Left"] = 2)] = "Left";
	Direction[(Direction["Right"] = 3)] = "Right";
})(Direction || (Direction = {}));

 */