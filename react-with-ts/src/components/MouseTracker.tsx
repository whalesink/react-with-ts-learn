import React, { useState, useEffect } from "react";

// eslint-disable-next-line
const MouseTracker1: React.FC = () => {
	const [position, setPos] = useState({ x: 0, y: 0 });

	useEffect(() => {
		console.log("A: add effect 添加订阅源", position.x);

		// 每次useEffect执行时都会添加一个新的事件，当次数多了会造成严重的性能浪费、甚至内存泄漏
		// 因此需要手动清除eventListener
		const setMousePos = (e: MouseEvent) => {
			console.log("B: subscribe inner 订阅源事件触发");
			setPos({ x: e.clientX, y: e.clientY });
		};

		document.addEventListener("click", setMousePos);

		// 如果useEffect返回一个函数，react将在执行清除操作时调用它
		return () => {
			console.log("C: remove effect 移除订阅源", position.x);
			document.removeEventListener("click", setMousePos);
		};
	});

	console.log("D: before render 组件即将渲染", position.x);

	return (
		<React.Fragment>
			<p>
				X: {position.x}, Y：{position.y}
			</p>
		</React.Fragment>
	);
};

// effect的条件执行
// eslint-disable-next-line
const MouseTracker2: React.FC = () => {
	const [position, setPos] = useState({ x: 0, y: 0 });

	// 组件1的作法显然矫枉过正：我们不需要在每次组件更新时都创建新的订阅，
	// 而是在某个数据源（source prop） 改变时重新创建
	useEffect(() => {
		console.log("A: add effect 添加订阅源", position.x);

		const setMousePos = (e: MouseEvent) => {
			console.log("B: subscribe inner 订阅源事件触发");
			setPos({ x: e.clientX, y: e.clientY });
		};

		document.addEventListener("click", setMousePos);

		return () => {
			console.log("C: remove effect 移除订阅源", position.x);
			document.removeEventListener("click", setMousePos);
		};
		// useEffect的第二个参数是effect所依赖的值数组, 该数组中的数据没更新, 该effect就不会被执行;
		// 这里是空数组, 则该effect只运行一次（仅在组件挂载和卸载时执行）
		// eslint-disable-next-line
	}, []);

	console.log("D: before render 组件即将渲染", position.x);

	return (
		<React.Fragment>
			<p>
				X: {position.x}, Y：{position.y}
			</p>
		</React.Fragment>
	);
};

// 自定义hook
const MouseTracker: React.FC = () => {
	const [position, setPos] = useState({ x: 0, y: 0 });

	// 组件1的作法显然矫枉过正：我们不需要在每次组件更新时都创建新的订阅，
	// 而是在某个数据源（source prop） 改变时重新创建
	useEffect(() => {
		console.log("A: add effect 添加订阅源", position.x);

		const setMousePos = (e: MouseEvent) => {
			console.log("B: subscribe inner 订阅源事件触发");
			setPos({ x: e.clientX, y: e.clientY });
		};

		document.addEventListener("click", setMousePos);

		return () => {
			console.log("C: remove effect 移除订阅源", position.x);
			document.removeEventListener("click", setMousePos);
		};
		// useEffect的第二个参数是effect所依赖的值数组, 该数组中的数据没更新, 该effect就不会被执行;
		// 这里是空数组, 则该effect只运行一次（仅在组件挂载和卸载时执行）
		// eslint-disable-next-line
	}, []);

	console.log("D: before render 组件即将渲染", position.x);

	return (
		<React.Fragment>
			<p>
				X: {position.x}, Y：{position.y}
			</p>
		</React.Fragment>
	);
};

export default MouseTracker;
