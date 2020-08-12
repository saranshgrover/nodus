import { useEffect, useRef } from 'react'
// custom hook for getting previous value
export default function usePrevious<T>(value: T) {
	const ref = useRef<T>()
	useEffect(() => {
		ref.current = value
	})
	return ref.current
}
