import * as createPalette from '@material-ui/core/styles/createPalette'

declare module '@material-ui/core/styles/createPalette' {
	interface PaletteOptions {
		competitionPrimary: Partial<createPalette.PaletteColor>
		competitionSecondary: Partial<createPalette.PaletteColor>
	}
	interface Palette {
		competitionPrimary: Partial<createPalette.PaletteColor>
		competitionSecondary: Partial<createPalette.PaletteColor>
	}
}
