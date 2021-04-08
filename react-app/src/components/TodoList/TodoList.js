import React, { Component, Fragment } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

class TodoList extends Component {
	constructor(props) {
		super(props);

		this.handleInputChange = this.handleInputChange.bind(this);
		this.deleteListItem = this.deleteListItem.bind(this);
		this.updateListItem = this.updateListItem.bind(this);

		this.state = {
			inputVal: "",
			list: ["React", "Component", "Todo", "React-Dom"],
		};
	}

	// 事件
	handleInputChange(e) {
		this.setState({ inputVal: e.target.value });
	}

	updateListItem() {
		return this.state.list.map((value, index) => {
			return (
				// 通过attribute的方式向子组件传值，也可以将父组件的事件传递过去
				<TodoItem
					content={value}
					index={index}
					key={index}
					deleteListItem={this.deleteListItem}
				></TodoItem>
			);
		});
	}

	deleteListItem(ind) {
		const list = [...this.state.list];
		list.splice(ind, 1);
		this.setState({ list });
	}

	render() {
		return (
			<Fragment>
				<label htmlFor="input" className="lable">
					新的代办事项：
				</label>
				<input
					className="input"
					id="input"
					type="text"
					placeholder="输入代办事项"
					value={this.state.inputVal}
					onChange={this.handleInputChange.bind(this)}
					onKeyUp={(e) => {
						if (e.keyCode === 13 && e.target.value !== "") {
							this.state.list.push(e.target.value);
							this.setState({
								inputVal: "",
								list: this.state.list,
							});
						}
					}}
				/>
				<ul>{this.updateListItem()}</ul>
			</Fragment>
		);
	}
}

export default TodoList;
