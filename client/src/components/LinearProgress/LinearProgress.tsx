import Progress from '@material-ui/core/LinearProgress'
import React, { useEffect, useState } from 'react'

/**
 * TODO This function is objectively stupid and needs to be redone.
 */
export default function LinearProgress() {
	const [show, setShow] = useState(false)
	useEffect(() => {
		let timeout = setTimeout(() => setShow(true), 500)
		return () => clearTimeout(timeout)
	}, [])
	return <>{show && <Progress />}</>
}
