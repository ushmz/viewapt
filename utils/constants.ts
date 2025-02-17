type IColor = `#${string}`;

interface IThemeColor {
	bg: IColor;
	fg: IColor;
}

interface ITheme {
	light: IThemeColor | IColor;
	dark: IThemeColor | IColor;
}

export const COLORS: { [key: string]: ITheme } = {
	primary: {
		light: { bg: "#0B57D0", fg: "#ffffff" },
		dark: { bg: "#A8C7FA", fg: "#062e6f" },
	},
	background: {
		light: "#ffffff",
		dark: "#1E1F20",
	},
};
