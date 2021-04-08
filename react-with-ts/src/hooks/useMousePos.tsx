import { useState, useEffect } from "react";

// 自定义hook也同样约定以use为前缀
const useMousePos = () => {
	const [position, setPos] = useState({ x: 0, y: 0 });

	useEffect(() => {
		console.log("A: add effect 添加订阅源", position.x);

		const setMousePos = (e: MouseEvent) => {
			console.log("B: subscribe inner 订阅源事件触发");
			setPos({ x: e.clientX, y: e.clientY });
		};

		document.addEventListener("mousemove", setMousePos);

		return () => {
			console.log("C: remove effect 移除订阅源", position.x);
			document.removeEventListener("mousemove", setMousePos);
		};
        // eslint-disable-next-line
	}, []);

	return position;
};

export default useMousePos;
