import React, { Component, Fragment } from "react";
import Child from "./child";

class Counter extends Component {
	// 组件创建
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			counter: 1,
			now: Date.now(),
		};
	}

	handleClick() {
		const counter = this.state.counter + 1;
		// 可以访问到已声明ref的DOM节点对象
		console.log(this.buttonEl.clientTop, this.divEl.innerHTML);
		// 若声明ref的是组件，则访问到的是组件实例
		console.log(this.childEl);

		this.setState({
			counter,
		});
		// 从控制台输出的值可以看出获取到的值比实际值更新慢一步
		// 这是由于setState是异步执行的缘故
		console.log(this.divEl.innerHTML);

		// 除了传入对象外，setState方法可以接收两个回调函数，第二个回调函数会在本次DOM更新后执行（类似vue中的nextTick）
		this.setState(
			() => {
				return {
					now: Date.now(),
				};
			},
			() => {
				console.log("DOM更新了", this.divEl.innerHTML);
			}
		);
	}

	render() {
		// 组件初次创建时，render函数会被执行一次
		// 当state数据变化时，render函数会被重新执行
		// 当props数据变化时，render函数会被重新执行
		console.log("render");
		return (
			<Fragment>
				<button
					onClick={this.handleClick}
					// 创建ref，来存储button节点
					ref={(btn) => {
						this.buttonEl = btn;
					}}
				>
					increase
				</button>
				<div
					ref={(div) => {
						this.divEl = div;
					}}
				>
					{this.state.counter + " " + this.state.now}
				</div>
				<Child
					value={this.state.counter}
					now={this.state.now}
					ref={(child) => {
						this.childEl = child;
					}}
				></Child>
			</Fragment>
		);
	}
}

export default Counter;
