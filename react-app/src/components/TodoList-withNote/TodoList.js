import React, { Component, Fragment } from "react";
import "./TodoList.css";

class TodoList extends Component {
	// 组件被创建时，构造器函数最先被执行
	constructor(props) {
		// 使用super将子类'TodoList'接收的外界参数, 传递给父类'Component'的构造函数；
		// 同时，在子类中，使用this前必须先调用super
		super(props);

		// 可以在构造函数中绑定组件事件的this
		// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
		this.handleInputChange = this.handleInputChange.bind(this);
		this.deleteListItem = this.deleteListItem.bind(this);
		// 约定组件的数据存放在state中
		this.state = {
			inputVal: "",
			list: ["React", "Component", "Todo", "React-Dom"],
		};
	}

	// 事件
	handleInputChange(e) {
		// this.state.inputVal = e.value; // 不能直接修改state中的初始数据，而是使用setState方法如下：

		// 这里的this原本的指向为undefined
		this.setState({ inputVal: e.target.value });
	}

	deleteListItem(ind) {
		// this.state.list.splice(ind, 1);
		// this.setState({ list: this.state.list });

		// 不直接修改state中的数据是为了防止某些问题
		const list = [...this.state.list];
		list.splice(ind, 1);
		this.setState({ list });
	}

	render() {
		return (
			// 返回同级的多个根节点，可以使用Fragment标签占位。
			<Fragment>
				<label htmlFor="input" className="lable">
					新的代办事项：
				</label>
				<input
					className="input"
					id="input"
					type="text"
					placeholder="输入代办事项"
					// 元素的attr可以绑定为变量，语法如下
					// 元素的attr不再是HTML中的attr，React DOM使用小驼峰命名attribute;
					value={this.state.inputVal}
					// 绑定事件时注意this如果不变更，会指向undefined而不是当前组件
					onChange={this.handleInputChange.bind(this)}
					// 也可以使用箭头函数来避免this指向带来的困扰
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
				<ul>
					{/* React的列表循环 此部分一般可以单独抽离到逻辑部分 从而让JSX部分更加简洁*/}
					{this.state.list.map((value, index) => {
						return (
							// 列表中的每一项要绑定唯一的key
							// <li
							// 	key={index}
							// 	onClick={this.deleteListItem.bind(this, index)}
							// >
							// 	{index}. {value}
							// </li>

							// JSX默认对字符串进行转义，如果要渲染为HTML代码可以这么做
							<li
								key={index}
								onClick={this.deleteListItem.bind(this, index)}
								dangerouslySetInnerHTML={{
									__html: index + " " + value,
								}}
							></li>
						);
					})}
				</ul>
			</Fragment>
		);
	}
}

export default TodoList;
