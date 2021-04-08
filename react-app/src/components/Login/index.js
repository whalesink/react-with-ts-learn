import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Modal, Input, message } from "antd";
import axios from "axios";

const btnStyle = { marginRight: 10 },
	inputStyle = { width: 300, margin: 10 },
	axiosConfig = { withCredentials: true };

// 使用withRouter()方法包装的组件，即使不在路由项中，也具有调用路由的能力
// 路由方法被封装在props中
export default withRouter(
	class Login extends React.Component {
		constructor(props) {
			super(props);
			this.handleLogin = this.handleLogin.bind(this);
			this.handleUsername = this.handleUsername.bind(this);
			this.handlePassword = this.handlePassword.bind(this);
			this.handleLogout = this.handleLogout.bind(this);

			this.state = {
				isLogin: false,
				ModalShow: false,
				username: "",
				password: "",
				confimModalShow: false,
			};
		}

		UNSAFE_componentWillMount() {}

		componentWillReceiveProps(newProps) {}

		render() {
			let { isLogin } = this.state;
			console.log(this.props);
			return (
				<React.Fragment>
					{isLogin ? (
						<Button
							style={btnStyle}
							
							onClick={() => {
								this.setState({
									confimModalShow: true,
								});
							}}
						>
							登出
						</Button>
					) : (
						<Button
							style={btnStyle}
							type="primary"
							onClick={() => {
								this.setState({ ModalShow: true });
							}}
						>
							登录
						</Button>
					)}
					<Link to="/vip">
						<Button type="primary" onClick={() => {}} danger>
							VIP
						</Button>
					</Link>
					<Modal
						title="登录"
						visible={this.state.ModalShow}
						onOk={this.handleLogin}
						onCancel={() => {
							this.setState({ ModalShow: false });
						}}
					>
						<Input
							placeholder="用户名"
							style={inputStyle}
							value={this.state.username}
							onChange={this.handleUsername}
						></Input>
						<Input
							placeholder="密码"
							style={inputStyle}
							type="password"
							value={this.state.password}
							onChange={this.handlePassword}
						></Input>
					</Modal>
					<Modal
						title="退出登录"
						visible={this.state.confimModalShow}
						onOk={this.handleLogout}
						onCancel={() => {
							this.setState({
								confimModalShow: false,
							});
						}}
						okText="确认"
						cancelText="取消"
					>
						<p>确定登出吗？</p>
					</Modal>
				</React.Fragment>
			);
		}

		componentDidMount() {
			axios
				.get(
					`http://www.dell-lee.com/react/api/isLogin.json`,
					axiosConfig
				)
				.then((r) => {
					this.setState({ isLogin: r.data.data.login });
				});
		}

		componentWillUnmount() {}

		handleLogin() {
			const { username, password } = this.state;
			const that = this;

			axios
				.get(
					`http://www.dell-lee.com/react/api/login.json?user=${username}&password=${password}`,
					axiosConfig
				)
				.then((r) => {
					console.log(r.data);
					const isLogin = r.data.data.login;
					if (isLogin) {
						message.success("已登录");
						that.setState({ ModalShow: false, isLogin });
					} else {
						message.error("信息错误; user: admin; psw: admin");
					}
				});
		}

		handleLogout() {
			axios
				.get(
					`http://www.dell-lee.com/react/api/logout.json`,
					axiosConfig
				)
				.then((r) => {
					console.log(r.data.data);
					let isLogin = !r.data.data.logout;
					if (!isLogin) {
						// 退出登录态，自动跳转至首页
						this.setState({ confimModalShow: false, isLogin });
						this.props.history.replace('/');
						message.success("已登出");
					}
				});
		}

		handleUsername(e) {
			this.setState({
				username: e.target.value,
			});
		}

		handlePassword(e) {
			this.setState({
				password: e.target.value,
			});
		}
	}
);
