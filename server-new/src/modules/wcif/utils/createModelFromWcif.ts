import axios from 'axios'
import { config } from '../../../config'
import { Wcif } from '../../../entities'

export default async function createModelFromWcif(
	data: Partial<Wcif> & { id: string },
	competitionId: string
): Promise<Wcif> {
	const compInformation = await axios({
		url: `${config.wca.originURL}/api/v0/competitions/${competitionId}/`,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	// Attach some data
	const compInfoData = compInformation.data
	data.locationName = compInfoData.venue_address
	data.registrationOpen = compInfoData.registration_open
	data.registrationClose = compInfoData.registration_close

	// Sort Schedule Activities according to start time. Without this, we'd have to sort each time.
	for (const venue of data.schedule?.venues!) {
		for (const room of venue.rooms) {
			room.activities.sort((a, b) => {
				let aTime = new Date(a.startTime)
				let bTime = new Date(b.startTime)
				return +aTime - +bTime
			})
		}
	}
	// Attach starting settings data
	// @ts-ignore because _id is dynamically created by mongo
	data.settings = {
		message: '',
		imageUrl: '',
		colorTheme: 'orange_200', // Orange default
	}
	data.competitionId = data.id
	data.synchronizedAt = new Date().getTime()
	delete data.id
	return data as Wcif
}
