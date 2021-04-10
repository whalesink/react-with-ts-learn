import { useState, useEffect } from "react";
import axios from "axios";

const useURLLoader = function (url: string, deps: any[] = []): any {
	// 使用useState传入null后，类型推断会将data指定为null类型
	// 避免上述结果，这里指定泛型变量的值为any
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios.get(url).then((r) => {
            console.log(r.data);
			setData(r.data);
			setLoading(false);
		});
	}, deps);
	return [data, loading];
};

export default useURLLoader;
