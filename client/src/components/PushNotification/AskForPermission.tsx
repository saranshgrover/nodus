import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { KeysInput, useSubscribeUserMutation } from 'generated/graphql'
import usePrevious from 'hooks/usePrevious'
import usePushNotifications from 'hooks/usePushNotifications'
import useSnackbar from 'hooks/useSnackbar'
import React, { ReactElement, useEffect, useState } from 'react'
import { browserName, deviceDetect } from 'react-device-detect'

interface Props {
	open: boolean
	setOpen: (newOpen: boolean) => void
	onComplete?: () => void
}

export default function AskForPermission({
	open,
	setOpen,
	onComplete,
}: Props): ReactElement {
	const {
		userConsent,
		loading,
		onClickAskUserPermission,
		userSubscription,
	} = usePushNotifications()
	const [asked, setAsked] = useState(false)
	const prevUserSubscription = usePrevious<PushSubscription | null>(
		userSubscription
	)
	const [subscribeMe] = useSubscribeUserMutation()
	const { addSnackbar } = useSnackbar()
	useEffect(() => {
		if (!prevUserSubscription && userSubscription && asked) {
			// DO GRAPHQL MUTATION HERE
			setAsked(false)
			const { osName, osVersion } = deviceDetect()
			subscribeMe({
				variables: {
					subscription: {
						endpoint: userSubscription.endpoint,
						keys: userSubscription.toJSON().keys as KeysInput,
						browser: browserName,
						device: `${osName} ${osVersion}`,
					},
				},
			}).then((res) => {
				if (!res)
					addSnackbar({
						message:
							'Unable to subscribe to push notifications. You may already be subscribed, or your browser may be incompatible',
						variant: 'error',
					})
				else {
					if (onComplete) onComplete()
				}
				setOpen(false)
			})
		}
	}, [userSubscription, asked])

	useEffect(() => {})
	const handleClose = () => {
		setOpen(false)
	}

	const handleAsk = () => {
		onClickAskUserPermission()
		setAsked(true)
	}

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'>
				<p>{userConsent}</p>
				<DialogTitle id='alert-dialog-title'>
					{asked
						? '🙋🏽‍♂️ Please Allow Notifications 🙋🏽‍♂️'
						: userSubscription
						? '✔ This device has push notifications enabled.'
						: 'Allow Nodus to send push notifications?'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						{`Nodus sends notifications for all groups that you are participating
						in for competitions, as well as when your results are uploaded. You
						can also individually subscribe to other competitors at each
						competition. Nodus does not send any spam.`}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Close
					</Button>
					<Button
						disabled={Boolean(userSubscription) || loading}
						onClick={handleAsk}
						color='primary'
						autoFocus>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
