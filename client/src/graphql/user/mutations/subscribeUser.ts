import gql from 'graphql-tag'

export const SubscribeUser = gql`
	mutation SubscribeUser($subscription: UserPushSubscription!) {
		subscribeMe(subscription: $subscription)
	}
`
