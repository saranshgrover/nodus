import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { UserMongooseModel } from '../model'

export default async function wcaApiFetch<T>(
	fetch: AxiosRequestConfig,
	options: {
		userId?: string
		accessToken?: string
	}
) {
	let token = options.accessToken
	if (!token) {
		if (!options.userId) throw new Error('No User ID provided')
		const user = await UserMongooseModel.findById(options.userId)
		if (!user) throw new Error('No matching user.')
		const wcaConnection = user.connections.find(
			(connection) => connection.connectionType === 'WCA'
		)
		if (!wcaConnection) {
			throw new Error('No WCA Connection found')
		}
		token = wcaConnection.accessToken
	}
	try {
		const res: AxiosResponse<T> = await axios({
			...fetch,
			headers: {
				...fetch.headers,
				Authorization: `Bearer ${token}`,
			},
		})
		return res
	} catch (err) {
		throw new Error(err.message)
	}
}
