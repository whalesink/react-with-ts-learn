import React, { Fragment } from "react";
import { Menu } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";
import "./index.css";
import logo from "../../asset/img/logo.png";

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			icon: <MailOutlined></MailOutlined>,
			list: [],
		};
	}

	setMenuItems() {
		return this.state.list.map((item) => {
			return (
				<Menu.Item key={item.id}>
					<Link to={`/${item.id}`}>{this.state.icon}</Link>
					{item.title}
				</Menu.Item>
			);
		});
	}

	render() {
		return (
			<Fragment>
				<Link to="/">
					<img
						src={logo}
						className="header-logo"
						alt=""
						title="LOGO"
					></img>
				</Link>
				<Menu
					mode="horizontal"
					className="header-menu"
					style={{ flexGrow: 1 }}
				>
					{this.setMenuItems()}
				</Menu>
			</Fragment>
		);
	}

	componentDidMount() {
		axios.get("http://www.dell-lee.com/react/api/header.json").then((r) => {
			// console.log(r.data.data);
			this.setState({
				list: r.data.data,
			});
		});
	}
}
