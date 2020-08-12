import { useEffect, useMemo, useState } from 'react'
import {
	askUserPermission,
	createNotificationSubscription,
	isPushNotificationSupported,
} from '../subscription'

const pushNotificationSupported = isPushNotificationSupported()

interface SubscriptionError {
	name: string
	message: string
	code: number
}

export default function usePushNotifications() {
	//to manage the user consent: Notification.permission is a JavaScript native function that return the current state of the permission
	//We initialize the userConsent with that value
	const [userConsent, setUserConsent] = useState(Notification.permission)
	const [
		userSubscription,
		setUserSubscription,
	] = useState<PushSubscription | null>(null)
	// @ts-ignore
	const [pushServerSubscriptionId, setPushServerSubscriptionId] = useState()
	const [error, setError] = useState<boolean | null | SubscriptionError>(null)
	const [loading, setLoading] = useState(false)

	// useEffect(() => {
	//     if(pushNotificationSupported) {
	//         setLoading(true)
	//         registerSer
	//     }
	// },[])

	useEffect(() => {
		setLoading(true)
		setError(false)
		const getExistingSubscription = async () => {
			const existingSubscription = await getUserSubscription()
			console.log(JSON.stringify(existingSubscription))
			setUserSubscription(existingSubscription)
			setLoading(false)
		}
		getExistingSubscription()
	}, [])

	/**
	 * define a click handler that asks the user permission,
	 * it uses the setSuserConsent state, to set the consent of the user
	 * If the user denies the consent, an error is created with the setError hook
	 */
	const onClickAskUserPermission = () => {
		setLoading(true)
		setError(false)
		askUserPermission().then((consent) => {
			setUserConsent(consent)
			if (consent !== 'granted') {
				setError({
					name: 'Consent denied',
					message: 'You denied the consent to receive notifications',
					code: 0,
				})
				setLoading(false)
			} else {
				onClickSubscribeToPushNotification()
				setLoading(false)
			}
		})
	}

	/**
	 * define a click handler that creates a push notification subscription.
	 * Once the subscription is created, it uses the setUserSubscription hook
	 */
	const onClickSubscribeToPushNotification = () => {
		setLoading(true)
		setError(false)
		createNotificationSubscription()
			.then(function (subscrition) {
				console.log(subscrition)
				setUserSubscription(subscrition)
				setLoading(false)
			})
			.catch((err) => {
				console.error(
					"Couldn't create the notification subscription",
					err,
					'name:',
					err.name,
					'message:',
					err.message,
					'code:',
					err.code
				)
				setError(err)
				setLoading(false)
			})
	}

	/**
	 * returns the subscription if present or nothing
	 */
	function getUserSubscription() {
		//wait for service worker installation to be ready, and then
		return navigator.serviceWorker.ready
			.then(function (serviceWorker) {
				return serviceWorker.pushManager.getSubscription()
			})
			.then(function (pushSubscription) {
				return pushSubscription
			})
	}

	/**
	 * define a click handler that sends the push susbcribtion to the push server.
	 * Once the subscription ics created on the server, it saves the id using the hook setPushServerSubscriptionId
	 */
	const onClickSendSubscriptionToPushServer = () => {
		// setLoading(true);
		// setError(false);
		// TODO: use Graphql mutation
		// http
		//   .post("/subscription", userSubscription)
		//   .then(function(response) {
		//     setPushServerSubscriptionId(response.id);
		//     setLoading(false);
		//   })
		//   .catch(err => {
		//     setLoading(false);
		//     setError(err);
		//   });
	}

	/**
	 * define a click handler that request the push server to send a notification, passing the id of the saved subscription
	 */
	const onClickSendNotification = async () => {
		setLoading(true)
		setError(false)
		await fetch(`/subscription/${pushServerSubscriptionId}`).catch((err) => {
			setLoading(false)
			setError(err)
		})
		setLoading(false)
	}
	const val = useMemo(
		() => ({
			onClickAskUserPermission,
			onClickSubscribeToPushNotification,
			onClickSendSubscriptionToPushServer,
			pushServerSubscriptionId,
			onClickSendNotification,
			userConsent,
			pushNotificationSupported,
			userSubscription,
			error,
			loading,
		}),
		[
			pushServerSubscriptionId,
			userConsent,
			pushNotificationSupported,
			userSubscription,
			error,
			loading,
		]
	)

	return val
}
