import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import TodoList from "./components/TodoList/TodoList";
import Counter from "./components/Counter/Counter";
import { Button } from "antd";
import Greeting from "./components/LifeCycles/greeting";

class Entry extends Component {
	constructor() {
		super();
		this.state = {
			style: { margin: 15 },
		};
	}

	render() {
		return (
			<Fragment>
				<div style={this.state.style}>
					{/* a标签不能跳转路由，要使用Link */}
					<Link to="/list">
						<Button style={this.state.style}>TodoList</Button>
					</Link>
					<Link to="/counter">
						<Button style={this.state.style}>Counter</Button>
					</Link>
					{/* 路由传参，在对应组件中，通过 this.props.location.search 获取到查询字符串，需要手动提取参数 */}
					{/* 这种传参方式效率很低，因此一般使用另外的方式*/}
					{/* <Link to="/greeting?name=zhangsan">
						<Button style={this.state.style}>LifeCycles</Button>
					</Link> */}
					{/* 这种传参方式可以直接获取，在对应组件中通过 this.props.match.params 可以访问到 */}
					<Link to="/greeting/zhangsan">
						<Button style={this.state.style}>LifeCycles</Button>
					</Link>
				</div>
			</Fragment>
		);
	}
}

ReactDOM.render(
	<Fragment>
		{/* 定义一个路由 */}
		<BrowserRouter>
			{/* Link组件要包含在BrowserRouter内，否则会报错 */}
			<Entry></Entry>
			{/* Route是一个路由项 component属性是该路由渲染的组件*/}
			<Route path="/list" component={TodoList}></Route>
			<Route path="/counter" component={Counter}></Route>
			{/* 这样定义参数名，访问/greeting/zhangsan，键名就会匹配到值，从而获取参数更加容易 */}
			<Route path="/greeting/:name" component={Greeting}></Route>
		</BrowserRouter>
	</Fragment>,
	document.getElementById("root")
);

// ReactDOM.render(<My />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
