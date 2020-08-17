import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { UserMongooseModel } from '../model'

export default async function wcaApiFetch<T>(
	userId: string,
	fetch: AxiosRequestConfig
) {
	const user = await UserMongooseModel.findById(userId)
	if (!user) throw new Error('No matching user.')
	const wcaConnection = user.connections.find(
		(connection) => connection.connectionType === 'WCA'
	)
	if (!wcaConnection) {
		throw new Error('No WCA Connection found')
	}
	try {
		const res: AxiosResponse<T> = await axios({
			...fetch,
			headers: {
				...fetch.headers,
				Authorization: `Bearer ${wcaConnection.accessToken}`,
			},
		})
		return res
	} catch (err) {
		throw new Error(err.message)
	}
}
