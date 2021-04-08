import React, { Component, Fragment } from "react";
import { Button } from "antd";
import axios from "axios";

class Greeting extends Component {
	// 组件挂载前
	componentWillMount() {
		console.log("componentWillMount");
	}

	// 组件接收的props变化之前
	componentWillReceiveProps() {
		console.log("componentWillReceiveProps");
	}

	// 数据更新前自动执行的更新逻辑，数据的改变是否需要重新渲染组件
	shouldComponentUpdate() {
		console.log("shouldComponentUpdate？");
		return true;
	}

	// 组件数据更新前(shouldComponentUpdate()返回true后)
	componentWillUpdate() {
		console.log("componentWillUpdate");
	}

	// 组件数据更新后
	componentDidUpdate() {
		console.log("componentDidUpdate");
	}

	// 组件渲染
	render() {
		// 获取路由中的查询字符串，如需要获取参数值，需要另外手动提取
		console.log(this.props.location.search);

		// 获取路由中的参数值
		console.log(this.props.match.params.name);

		return (
			<Fragment>
				<h4>hello</h4>
				<Button type="primary">Antd</Button>
			</Fragment>
		);
	}

	// 组件挂载后
	componentDidMount() {
		console.log("componentDidMount");
		axios.get("http://www.dell-lee.com/react/api/demo.json").then((r) => {
			console.log(r.data);
		});
	}

	// 组件被卸载前
	componentWillUnmount() {
		console.log("componentWillUnmount");
	}
}

export default Greeting;
