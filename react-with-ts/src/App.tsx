import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import LikeButton from "./components/LikeButton";
import MouseTracker from "./components/MouseTracker";
import useMousePos from "./hooks/useMousePos";

function App() {
	const [show, setShow] = useState(true);
	const position = useMousePos();
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<LikeButton></LikeButton>
				<p>
					<button
						onClick={() => {
							setShow(!show);
						}}
					>
						Toggle Tracker
					</button>
				</p>
				
				<p>
					X: {position.x}, Y：{position.y}
				</p>
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
		</div>
	);
}

export default App;
