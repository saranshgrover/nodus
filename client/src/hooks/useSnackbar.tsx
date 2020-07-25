import { SnackbarContext } from 'contexts/SnackbarContext'
import { useContext } from 'react'

export default function useSnackbar() {
	return useContext(SnackbarContext)
}
