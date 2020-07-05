import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
} from 'react'
import {
	createMuiTheme,
	ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { blueGrey, orange } from '@material-ui/core/colors'
import { useMemo } from 'react'

// typography
const typography = {
	fontFamily: [
		'Playfair Display',
		'Open Sans',
		'"Helvetica Neue"',
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
	].join(','),
}

const themes = (type, competitionPrimary=orange, competitionSecondary=blueGrey) => {
	switch(type) {
		case 'dark':
			return ({
					palette: {
						primary: orange,
						secondary: blueGrey,
						competitionPrimary,
						competitionSecondary,
						type: 'dark',
					},
					typography: typography,
			})
		case 'light':
		 return ({
			palette: {
				primary: orange,
				secondary: blueGrey,
				competitionPrimary,
				competitionSecondary,
				type: 'light',
			},
			typography: typography
		})
	}
}


export const ToggleThemeContext = createContext()


export default function ThemeProvider({ children }) {
	const storedThemeType = window.localStorage.getItem('themeType')
	const prefersDarkMode = useMediaQuery('@media (prefers-color-scheme: dark)')
	const [theme, setTheme] = useState(null)
	const [overrides, setOverrides] = useState({})
	const [themeType, setThemeType] = useState(
		storedThemeType || (prefersDarkMode ? 'dark' : 'light')
	)
	useEffect(() => {
		setTheme(createMuiTheme(themes(themeType, overrides.primary || orange, overrides.secondary || blueGrey)))
		window.localStorage.setItem('themeType', themeType)
		
	},[themeType, overrides])
	const toggleTheme = useCallback(() => {
		setThemeType((themeType) => (themeType === 'light' ? 'dark' : 'light'))
	}, [])

	const updateTheme = (overrides) => {
		setOverrides(overrides)
	}

	const value = useMemo(() => ({theme, toggleTheme, updateTheme}), [theme])

	if(!theme) return (<></>)
	return (
		<MuiThemeProvider theme={theme}>
			<ToggleThemeContext.Provider value={value}>
				{children}
			</ToggleThemeContext.Provider>
		</MuiThemeProvider>
	)
}
