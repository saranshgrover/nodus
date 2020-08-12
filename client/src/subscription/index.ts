const convertedVapidKey = urlBase64ToUint8Array(
	process.env.REACT_APP_VAPID_PUBLIC_KEY
)
function urlBase64ToUint8Array(base64String: string | undefined) {
	if (!base64String) throw new Error('Vapid Key not found')
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
	// eslint-disable-next-line
	const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

	const rawData = window.atob(base64)
	const outputArray = new Uint8Array(rawData.length)

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i)
	}
	return outputArray
}

/**
 * asks user consent to receive push notifications and returns the response of the user, one of granted, default, denied
 */
export async function askUserPermission() {
	return await Notification.requestPermission()
}

export function isPushNotificationSupported() {
	return 'serviceWorker' in navigator && 'PushManager' in window
}

/**
 * returns the subscription if present or nothing
 */
export function getUserSubscription() {
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
 *
 * using the registered service worker creates a push notification subscription and returns it
 *
 */
export async function createNotificationSubscription() {
	//wait for service worker installation to be ready
	const serviceWorker = await navigator.serviceWorker.ready
	// subscribe and return the subscription
	return await serviceWorker.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: convertedVapidKey,
	})
}
