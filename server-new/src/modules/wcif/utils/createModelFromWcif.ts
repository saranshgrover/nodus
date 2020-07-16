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
	// Attach starting settings data
	// @ts-ignore because _id is dynamically created by mongo
	data.settings = {
		message: '',
		imageUrl: '',
		colorTheme: 'orange_200', // Orange default
	}
	data.competitionId = data.id
	delete data.id
	return data as Wcif
}
