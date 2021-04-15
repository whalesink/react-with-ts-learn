import React from "react";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
import "./App.css";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h3>Button</h3>
				<Button
					onClick={(e) => {
						e.preventDefault();
						alert(1);
					}}
					autoFocus
				>
					默认按钮
				</Button>
				<Button size={ButtonSize.Large}>大号按钮</Button>
				<Button size={ButtonSize.Small}>小号按钮</Button>
				<Button btnType={ButtonType.Primary}>主要按钮</Button>
				<Button btnType={ButtonType.Danger}>危险按钮</Button>

				<Button size={ButtonSize.Small} disabled>
					禁用按钮
				</Button>
				<Button btnType={ButtonType.Link} href="#" target="_blank">
					链接按钮
				</Button>
				<Button btnType={ButtonType.Link} href="#" disabled>
					禁用链接按钮
				</Button>
			</header>
		</div>
	);
}

export default App;
