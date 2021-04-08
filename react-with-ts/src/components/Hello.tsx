import React from "react";

interface IHelloProps {
	message: string | number;
}

// React.FunctionComponent是一个描述ReactDOM类型的接口, 别名是 React.FC
const Hello: React.FC<IHelloProps> = (props) => {
	// 经过类型、接口、泛型的修饰，prop获得了一系列静态属性的自动补全
	// 如：props.children、props.message
	return <h2>{props.message}</h2>;
};

// 设定组件默认props
Hello.defaultProps = {
	message: "hello world",
};

export default Hello;
