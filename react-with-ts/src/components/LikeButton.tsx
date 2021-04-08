import React, { useEffect, useState } from "react";
import useMousePos from "../hooks/useMousePos";

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
const LikeButton: React.FC = () => {
	const [like, setLike] = useState(0);
	const position = useMousePos();
	// 默认情况下，useEffect在组件第一次渲染之后和每次更新之后都会执行
	// React 保证了每次运行 effect 的同时，DOM 都已经更新完毕。
	useEffect(() => {
		document.title = `一共获得了 ${like} 个赞👍`;
	});

	return (
		<React.Fragment>
			<h2>X: {position.x}, Y：{position.y}</h2>
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
