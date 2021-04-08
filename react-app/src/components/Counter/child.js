import React, { Component, Fragment } from "react";

class Child extends Component {
	render() {
		// console.log("child render");
		// 子 组件初次创建时，render函数会被执行一次
		// 当state数据变化时，render函数会被重新执行
		return (
			<Fragment>
				<div>{"Counter：" + this.props.value}</div>
				<div>{"Time：" + this.props.now}</div>
			</Fragment>
		);
	}
}

export default Child;
