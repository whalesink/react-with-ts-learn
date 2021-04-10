import React, { useEffect, useState, useRef, useContext } from "react";
import useMousePos from "../hooks/useMousePos";
import { ThemeContext } from "../App";

// React.FunctionComponent是一个描述ReactDOM类型的接口, 别名是 React.FC
// eslint-disable-next-line
const LikeButton1: React.FC = () => {
	// useState 就是一个hook
	// useState 返回数组，它总是包含一对值：当前值和一个可以改变前者的钩子
	const [like, setLike] = useState(0);
	return (
		<React.Fragment>
			<button
				onClick={() => {
					// 每次点击会使like增加1且更新视图
					setLike(like + 1);
				}}
			>
				{like}赞👍
			</button>
		</React.Fragment>
	);
};

// state可以是一个对象
// eslint-disable-next-line
const LikeButton2: React.FC = () => {
	const [obj, setObj] = useState({ like: 0, switchOn: true });

	return (
		<React.Fragment>
			<button
				onClick={() => {
					// 和class组件不同，每次修改state时，数据更新策略是直接替换state而非合并
					// 因此即使state中的某些值不需要修改，也要手动传入state的完整对象
					setObj({ like: obj.like + 1, switchOn: obj.switchOn });
				}}
			>
				{obj.like}赞👍
			</button>
			<button
				onClick={() => {
					setObj({ like: obj.like, switchOn: !obj.switchOn });
				}}
			>
				{obj.switchOn ? "ON" : "OFF"}
			</button>
		</React.Fragment>
	);
};

// 设置多个state
// eslint-disable-next-line
const LikeButton3: React.FC = () => {
	// 多个state的好处是，在后期更容易抽离部分组件逻辑到自定义Hook中；
	// 将相关的state编为一组，更能够提升可读性和可维护性
	const [like, setLike] = useState(0);
	const [on, setSwitchOn] = useState(true);
	return (
		<React.Fragment>
			<button
				onClick={() => {
					setLike(like + 1);
				}}
			>
				{like}赞👍
			</button>
			<button
				onClick={() => {
					setSwitchOn(!on);
				}}
			>
				{on ? "ON" : "OFF"}
			</button>
		</React.Fragment>
	);
};

/**
 * 无需清除的effect
 */
const LikeButton4: React.FC = () => {
	const [like, setLike] = useState(0);
	const position = useMousePos();
	// 默认情况下，useEffect在组件第一次渲染之后和每次更新之后都会执行
	// React 保证了每次运行 effect 的同时，DOM 都已经更新完毕。
	useEffect(() => {
		document.title = `一共获得了 ${like} 个赞👍`;
	});

	return (
		<React.Fragment>
			<h2>
				X: {position.x}, Y：{position.y}
			</h2>
			<button
				onClick={() => {
					setLike(like + 1);
				}}
			>
				{like}赞👍
			</button>
		</React.Fragment>
	);
};

/**
 * useRef - state遇到的难题
 */
const LikeButton5: React.FC = () => {
	const [like, setLike] = useState(0);
	const position = useMousePos();
	useEffect(() => {
		document.title = `一共获得了 ${like} 个赞👍`;
	});

	// 当state中的值经常变化时，每次使用的state其状态都不同；
	// 如该例中的like值，用户点击一次就会改变一次，而后组件重新渲染一次；
	// 验证：点击任意次 赞 后，紧接着点击 Alert，然后紧接着继续点击任意次 赞；alert的值是旧值而不是最新值；
	// 显然，like值存储在一个闭包中

	// 结论是，在任意一次渲染中，state与props是始终不变的；使用到它们的任何值也是独立的。（下面的handleAlertClick就是如此）
	// 在下一次渲染中，会替换为全新的state和props；
	// 带来的问题是，如何在数次的渲染中产生联系？
	function handleAlertClick() {
		setTimeout(() => {
			alert("you click on " + like);
		}, 2000);
	}

	return (
		<React.Fragment>
			<h2>
				X: {position.x}, Y：{position.y}
			</h2>
			<button
				onClick={() => {
					setLike(like + 1);
				}}
			>
				{like}赞👍
			</button>
			<button onClick={handleAlertClick}>Alert</button>
		</React.Fragment>
	);
};

// useRef
const LikeButton6: React.FC = () => {
	const [like, setLike] = useState(0);
	const position = useMousePos();

	// useRef返回的 ref 对象在组件的整个生命周期内保持不变，但其current值需要手动维护
	// 这里和like初始化为同一个值，其current保持和like的同步变化
	const likeRef = useRef(0);

	useEffect(() => {
		document.title = `一共获得了 ${like} 个赞👍`;
	});

	// 用一种更加明显的方式表现函数组件的update生命周期（像class组件那样）
	const didMountRef = useRef(false);
	useEffect(() => {
		if (didMountRef.current) {
			console.log("this is updated");
		} else {
			didMountRef.current = true;
		}
	});

	function handleAlertClick() {
		setTimeout(() => {
			// 此例可以看出函数组件的缺点：它弱化了生命周期的概念
			// 这里拿到的值就是最新的了
			alert("you click on " + like + " crt: " + likeRef.current);
		}, 2000);
	}

	return (
		<React.Fragment>
			<h2>
				X: {position.x}, Y：{position.y}
			</h2>
			<button
				onClick={() => {
					setLike(like + 1);
					// current值保持和like的同步变化
					likeRef.current++;
				}}
			>
				{like}赞👍
			</button>
			<button onClick={handleAlertClick}>Alert</button>
		</React.Fragment>
	);
};

// 使用useRef访问DOM节点
const LikeButton: React.FC = () => {
	const [like, setLike] = useState(0);
	const likeRef = useRef(0);
	const theme = useContext(ThemeContext);
	// console.log(theme);
	const style = { ...theme };
	console.log(style);

	useEffect(() => {
		document.title = `一共获得了 ${like} 个赞👍`;
	});

	// 需要获得的是inputElement，故指定泛型
	const domRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (domRef && domRef.current) {
			// 每次组件更新都会聚焦input
			domRef.current.focus();
		}
	});

	const didMountRef = useRef(false);
	useEffect(() => {
		if (didMountRef.current) {
			console.log("this is updated");
		} else {
			didMountRef.current = true;
		}
	});

	function handleAlertClick() {
		setTimeout(() => {
			alert("you click on " + like + " crt: " + likeRef.current);
		}, 2000);
	}

	return (
		<React.Fragment>
			{/* 指定ref属性为domRef */}
			<input type="text" ref={domRef} />
			<button
				style={style}
				onClick={() => {
					setLike(like + 1);
					likeRef.current++;
				}}
			>
				{like}赞👍
			</button>
			<button onClick={handleAlertClick}>Alert</button>
		</React.Fragment>
	);
};

// class component的示例
// class ClassLikeButton extends React.Component {
// 	constructor(props: {}) {
// 		super(props);
// 		this.state = {
// 			like: 0,
// 		};
// 	}

// 	componentDidMount() {
// 		document.title = `一共获得了 ${this.state.like} 个赞👍`;
// 	}
// 	componentDidUpdate() {
// 		document.title = `一共获得了 ${this.state.like} 个赞👍`;
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<button
// 					onClick={() => {
// 						this.setState({ like: this.state.like + 1 });
// 					}}
// 				>
// 					{this.state.like}赞👍
// 				</button>
// 			</div>
// 		);
// 	}
// }

export default LikeButton;
