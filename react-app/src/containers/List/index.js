import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as Antd from "antd";

// const data = [
// 	"Racing car sprays burning fuel into crowd.",
// 	"Japanese princess to wed commoner.",
// 	"Australian walks 100km after outback crash.",
// 	"Man charged over missing wedding girl.",
// 	"Los Angeles battles huge wildfires.",
// ];

export default class PageList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listData: [],
		};
	}

	UNSAFE_componentWillMount() {}

	// 路由中的参数变化(props)会触发此生命周期
	componentWillReceiveProps(newProps) {
		let id = newProps.match.params.id;
		console.log(id);
		axios
			.get(
				`http://www.dell-lee.com/react/api/list.json${
					id ? "?id=" + id : ""
				}`
			)
			.then((r) => {
				this.setState({
					listData: r.data.data,
				});
			});
	}

	render() {
		return (
			<React.Fragment>
				<Antd.List
					size="small"
					// header={<div>Header</div>}
					// footer={<div>Footer</div>}
					bordered
					dataSource={this.state.listData}
					renderItem={(item) => (
						<Link to={`/detail/${item.id}`}>
							<Antd.List.Item>{item.title}</Antd.List.Item>
						</Link>
					)}
				/>
			</React.Fragment>
		);
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		axios
			.get(
				`http://www.dell-lee.com/react/api/list.json${
					id ? "?id=" + id : ""
				}`
			)
			.then((r) => {
				this.setState({
					listData: r.data.data,
				});
			});
	}

	componentWillUnmount() {}
}
