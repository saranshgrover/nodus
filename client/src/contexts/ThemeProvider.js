import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
} from "react";
import {
	createMuiTheme,
	ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { blue, blueGrey, pink, amber, orange } from "@material-ui/core/colors";

// typography
const typography = {
	fontFamily: [
		"Playfair Display",
		"Open Sans",
		'"Helvetica Neue"',
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
	].join(","),
};

const themes = {
	dark: {
		palette: {
			primary: orange,
			secondary: blueGrey,
			type: "dark",
		},
		typography: typography,
	},
	light: {
		palette: {
			primary: orange,
			secondary: blueGrey,
			type: "light",
		},
		typography: typography,
	},
};
export const ToggleThemeContext = createContext();

const storedThemeType = window.localStorage.getItem("themeType");

export default function ThemeProvider({ thechildren }) {
	const prefersDarkMode = useMediaQuery(
		"@media (prefers-color-scheme: dark)"
	);
	const [theme, setTheme] = useState(
		storedThemeType || (prefersDarkMode ? "dark" : "light")
	);
	const toggleTheme = useCallback(() => {
		setTheme((theme) => (theme === "light" ? "dark" : "light"));
	}, []);
	useEffect(() => {
		window.localStorage.setItem("themeType", theme);
	}, [theme]);
	return (
		<MuiThemeProvider theme={createMuiTheme(themes[theme])}>
			<ToggleThemeContext.Provider value={toggleTheme}>
				{children}
			</ToggleThemeContext.Provider>
		</MuiThemeProvider>
	);
}
