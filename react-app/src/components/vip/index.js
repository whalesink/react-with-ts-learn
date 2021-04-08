import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Spin } from "antd";
import "./style.css";

export default class vip extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogin: true,
			isRequestFinished: false,
		};
	}

	UNSAFE_componentWillMount() {}

	componentWillReceiveProps(newProps) {}

	render() {
		console.log(this.state);
		if (this.state.isLogin) {
			if (this.state.isRequestFinished) {
				// VIP内容
				return <div className="vip">VIP ZONE</div>;
			} else {
				return (
					<div className="vip">
						<Spin></Spin>
						请稍后...
					</div>
				);
			}
		} else {
			// 如果用户未登录，重定向至首页
			return <Redirect to="/"></Redirect>;
		}
	}

	componentDidMount() {
		axios
			.get(`http://www.dell-lee.com/react/api/isLogin.json`, {
				withCredentials: true,
			})
			.then((r) => {
				this.setState({
					// isLogin: r.data.data.login,
					isRequestFinished: true,
				});
			});
	}

	componentWillUnmount() {}
}
