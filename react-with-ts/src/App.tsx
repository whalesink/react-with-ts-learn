import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import LikeButton from "./components/LikeButton";
import MouseTracker from "./components/MouseTracker";
import useMousePos from "./hooks/useMousePos";
import useURLLoader from "./hooks/useURLLoader";
import Hello from "./components/Hello";

interface IShowResult {
	message: string;
	status: string;
}

// 描述主题参数
interface IThemeProps {
	[key: string]: {
		color: string;
		background: string;
	};
}

// 定义两种简单主题
const themes: IThemeProps = {
	light: {
		color: "#000",
		background: "#eee",
	},

	dark: {
		color: "#fff",
		background: "#222",
	},
};

// 获得context
export const ThemeContext = React.createContext(themes.dark);

function App() {
	const [show, setShow] = useState(true);
	const [data, loading] = useURLLoader(
		"http://dog.ceo/api/breeds/image/random"
	);

	const dogRes = data as IShowResult;
	// const position = useMousePos();
	return (
		<div className="App">
			{/* ThemeContext.Provider内层的组件都可以访问到context值 */}
			<ThemeContext.Provider value={themes.dark}>
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<LikeButton></LikeButton>
					<Hello message={""}></Hello>
					<p>
						<button
							onClick={() => {
								setShow(!show);
							}}
						>
							Toggle Tracker
						</button>
					</p>
					{loading ? (
						<p>加载中...</p>
					) : (
						<img src={dogRes && dogRes.message} alt="" />
					)}
					{/* <p>
					X: {position.x}, Y：{position.y}
				</p> */}
					{/* {show && <MouseTracker></MouseTracker>} */}

					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
				</header>
			</ThemeContext.Provider>
		</div>
	);
}

export default App;
