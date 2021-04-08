import React, { Component } from "react";

// todolist的子组件
class TodoItem extends Component {
	constructor(props) {
		super(props);
		this.deleteItem = this.deleteItem.bind(this);
	}

	deleteItem() {
		// 与父组件通信时，需要调用父组件传递过来的方法
		// 注意调用该方法时，其内部this的指向是当前子组件，故需要在父组件中将该方法的this绑定为父组件本身
		this.props.deleteListItem(this.props.index);
	}

	render() {
		// 父组件传过来的值存放在props中
		return (
			<li onClick={this.deleteItem}>
				{this.props.index} {this.props.content}
			</li>
		);
	}
}

export default TodoItem;
