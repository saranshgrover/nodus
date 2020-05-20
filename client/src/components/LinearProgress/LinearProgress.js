import React, { useEffect, useState } from 'react'
import Progress from '@material-ui/core/LinearProgress'

export default function LinearProgress() {
	const [show, setShow] = useState(false)
	useEffect(() => {
		let timeout = setTimeout(() => setShow(true), 500)
		return () => clearTimeout(timeout)
	}, [])
	return <>{show && <Progress />}</>
}
