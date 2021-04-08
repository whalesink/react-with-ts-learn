import React from "react";
import axios from "axios";
import { Card } from "antd";
import "./style.css";

export default class Detail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			content: "",
		};
	}

	UNSAFE_componentWillMount() {}

	componentWillReceiveProps(newProps) {}

	render() {
		return (
			<React.Fragment>
				{/* <div>{this.props.match.params.id}</div> */}
				<Card title={this.state.title}>
					<p
                        className="rich-p"
						dangerouslySetInnerHTML={{ __html: this.state.content }}
					></p>
				</Card>
			</React.Fragment>
		);
	}

	componentDidMount() {
		let id = this.props.match.params.id;
		axios
			.get(`http://www.dell-lee.com/react/api/detail.json?id=${id}`)
			.then((r) => {
				let d = r.data.data;
				this.setState(d);
			});
	}

	componentWillUnmount() {}
}
