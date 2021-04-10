import React, { useContext } from "react";
import { ThemeContext } from "../App";

interface IHelloProps {
	message: string | number;
}

// React.FunctionComponent是一个描述ReactDOM类型的接口, 别名是 React.FC
const Hello: React.FC<IHelloProps> = (props) => {
	const theme = useContext(ThemeContext);
	// console.log(theme);
	const style = { ...theme };
	console.log(style);

	// 经过类型、接口、泛型的修饰，prop获得了一系列静态属性的自动补全
	// 如：props.children、props.message
	return <h2 style={style}>{props.message}</h2>;
};

// 设定组件默认props
Hello.defaultProps = {
	message: "hello world",
};

export default Hello;
