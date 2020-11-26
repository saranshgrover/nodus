import { blueGrey, orange } from '@material-ui/core/colors'
import {
	createMuiTheme,
	responsiveFontSizes,
	Theme,
	ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles'
import { Overrides } from '@material-ui/core/styles/overrides'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import React, {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react'

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

const themes = (
	type: string,
	competitionPrimary = orange,
	competitionSecondary = blueGrey
) => {
	switch (type) {
		case 'dark':
			return {
				palette: {
					primary: orange,
					secondary: blueGrey,
					competitionPrimary,
					competitionSecondary,
					type: 'dark',
				},
				typography: typography,
			}
		default:
			return {
				palette: {
					primary: orange,
					secondary: blueGrey,
					competitionPrimary,
					competitionSecondary,
					type: 'light',
				},
				typography: typography,
			}
	}
}

const getOverrides = (theme: Theme): Overrides => ({
	MuiLinearProgress: {
		root: {
			height: 6,
		},
		colorPrimary: {
			backgroundColor:
				theme.palette.type === 'dark'
					? 'rgba(255, 255, 255, .2)'
					: 'rgba(0,0,0,0.2)',
		},
		bar: {
			borderRadius: 2.5,
		},
		barColorPrimary: {
			background: `linear-gradient(60deg, ${theme.palette.primary.light} , ${theme.palette.primary.dark})`,
		},
	},
	MuiToolbar: {
		root: {
			borderBottom: `1px solid rgba(0, 0, 0, 0.12)`,
		},
	},
})

interface IThemeProvider {
	theme: Theme
	toggleTheme: () => void
	updateTheme: (overrides: { primary: any; secondary: any }) => void
}

export const ToggleThemeContext = createContext({} as IThemeProvider)

export default function ThemeProvider({
	children,
}: React.PropsWithChildren<{}>) {
	const storedThemeType = window.localStorage.getItem('themeType')
	const prefersDarkMode = useMediaQuery('@media (prefers-color-scheme: dark)')
	const [theme, setTheme] = useState<Theme>()
	const [overrides, setOverrides] = useState<{ primary: any; secondary: any }>()
	const [themeType, setThemeType] = useState(
		storedThemeType || (prefersDarkMode ? 'dark' : 'light')
	)
	useEffect(() => {
		const _theme = themes(themeType, overrides?.primary, overrides?.secondary)
		// TODOp2 whats wrong here?
		let muiTheme = createMuiTheme({ ...(_theme as any) })
		setTheme(
			responsiveFontSizes({ ...muiTheme, overrides: getOverrides(muiTheme) })
		)
		window.localStorage.setItem('themeType', themeType)
	}, [themeType, overrides])
	const toggleTheme = useCallback(() => {
		setThemeType((themeType) => (themeType === 'light' ? 'dark' : 'light'))
	}, [])

	const updateTheme = (overrides: { primary: any; secondary: any }) => {
		setOverrides(overrides)
	}

	const value = useMemo(() => ({ theme: theme!, toggleTheme, updateTheme }), [
		theme,
	])

	if (!theme) return <></>
	return (
		<MuiThemeProvider theme={theme}>
			<ToggleThemeContext.Provider value={value}>
				{children}
			</ToggleThemeContext.Provider>
		</MuiThemeProvider>
	)
}
