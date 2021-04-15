import React from "react";
import classNames from "classnames";

export enum ButtonSize {
	Large = "lg",
	Small = "sm",
}

export enum ButtonType {
	Primary = "primary",
	Default = "default",
	Danger = "danger",
	Link = "link",
}

interface BaseButtonProps {
	className?: string;
	disabled?: boolean;
	size?: ButtonSize;
	btnType?: ButtonType;
	children: React.ReactNode;
	href?: string;
}

// 得到所有原生button元素属性 <叠加类型 &表示两者为并集关系>
type NativeButtonProps = BaseButtonProps &
	React.ButtonHTMLAttributes<HTMLElement>;

// 得到所有a元素属性
type AbchorButtonPorps = BaseButtonProps &
	React.AnchorHTMLAttributes<HTMLElement>;

// Partial修饰一个泛型，得到一个全体参数可选的类型
export type ButtonProps = Partial<NativeButtonProps & AbchorButtonPorps>;

const Button: React.FC<ButtonProps> = (props) => {
	const {
		btnType,
		className,
		size,
		disabled,
		children,
		href,
		...restProps
	} = props;

	const classes = classNames("btn", className, {
		[`btn-${btnType}`]: btnType,
		[`btn-${size}`]: size,
		disabled: btnType === ButtonType.Link && disabled,
	});

	if (btnType === ButtonType.Link && href) {
		// 链接按钮
		return (
			<a href={href} className={classes} {...restProps}>
				{children}
			</a>
		);
	} else {
		return (
			<button className={classes} disabled={disabled} {...restProps}>
				{children}
			</button>
		);
	}
};

Button.defaultProps = {
	disabled: false,
	btnType: ButtonType.Default,
};

export default Button;
