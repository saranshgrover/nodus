import Button, { ButtonProps } from '@material-ui/core/Button'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import React, { ReactElement, ReactNode, useState } from 'react'

interface Props {
	callback: (success: boolean) => void
	dialogProps?: DialogProps
	dialogTitle?: ReactNode
	dialogContentText?: ReactNode
	buttonProps?: ButtonProps
	confirmText?: ReactNode
	cancelText?: ReactNode
}

export default function ConfirmationDialog({
	callback,
	dialogProps,
	dialogTitle,
	dialogContentText,
	buttonProps,
	confirmText,
	cancelText,
}: Props): ReactElement {
	const [open, setOpen] = useState(true)
	return (
		<Dialog
			open={open}
			onClose={() => {
				setOpen(false)
				callback(false)
			}}
			{...dialogProps}>
			<DialogTitle id='confirmation-dialog'>
				{dialogTitle ?? 'Are you sure?'}
			</DialogTitle>
			<DialogContent>
				{dialogContentText ?? 'Please confirm this action'}
			</DialogContent>
			<DialogActions>
				<Button onClick={() => callback(true)} {...buttonProps} color='primary'>
					{confirmText ?? 'Yes'}
				</Button>
				<Button
					onClick={() => callback(false)}
					{...buttonProps}
					color='secondary'>
					{cancelText ?? 'Cancel'}
				</Button>
			</DialogActions>
		</Dialog>
	)
}
