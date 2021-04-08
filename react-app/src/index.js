import React, { Component } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import "./App.css";
import List from "./containers/List/index";
import Detail from "./containers/Detail/index";

import IndexHeader from "./components/Header";
import Login from "./components/Login";
import Vip from "./components/vip";

const { Header, Footer, Content } = Layout;
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<BrowserRouter>
				<Layout
					style={{
						display: "flex",
						flexDirection: "column",
						height: "100vh",
						minWidth: "100%",
					}}
				>
					<Header className="header">
						<IndexHeader></IndexHeader>
						<Login></Login>
					</Header>
					<Content className="content">
						{/* switch组件匹配到第一个符合要求的路由就不再继续查询 */}
						<Switch>
							<Route
								path="/detail/:id"
								component={Detail}
							></Route>
							<Route path="/vip" component={Vip}></Route>
							{/* /:id?表示即使路由后不带有参数，也会匹配到该路由 */}
							<Route path="/:id?" component={List}></Route>
						</Switch>
					</Content>
					<Footer className="footer">THIS IS A PAGE FOOTER</Footer>
				</Layout>
			</BrowserRouter>
		);
	}
}

ReactDOM.render(<App></App>, document.getElementById("root"));
// ReactDOM.render(<My />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
