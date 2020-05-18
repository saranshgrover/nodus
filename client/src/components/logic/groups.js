/* eslint-disable array-callback-return */
/**
 *
 * @param {{}} round Round WCIF Object
 * @param {{}} number Round Number
 * @param {{}} wcif WCIF
 *
 * @return {[{}]} Returns all qualified competitors for the given round
 */
export const getQualified = (round, number, wcif) => {
	if (number === 1) {
		return wcif.persons.filter(
			(person) =>
				person.registration?.eventIds.includes(
					round.id.substring(0, round.id.indexOf('-'))
				) && person.registration.status === 'accepted'
		)
	} else {
		const event = wcif.events.find(
			(event) => event.id === round.id.substring(0, round.id.indexOf('-'))
		)
		const prevRound = event.rounds[number - 2]

		if (prevRound.advancementCondition) {
			let advancedCompetitors = []
			const numResults = prevRound.results.length
			switch (prevRound.advancementCondition.type) {
				case 'ranking':
					prevRound.results.map((result) => {
						if (result.ranking <= prevRound.advancementCondition.level) {
							if ((advancedCompetitors.length + 1) / numResults > 0.75) {
								return advancedCompetitors
							} else {
								advancedCompetitors.push({
									...wcif.persons.find(
										(person) => person.registrantId === result.personId
									),
									result,
								})
							}
						}
					})
					return advancedCompetitors
				case 'percent':
					prevRound.results.map((result) => {
						if (
							(advancedCompetitors.length + 1) / numResults <=
							prevRound.advancementCondition.level / 100
						) {
							advancedCompetitors.push({
								...wcif.persons.find(
									(person) => person.registrantId === result.personId
								),
								result,
							})
						}
					})
					return advancedCompetitors
				case 'attemptResult':
					prevRound.results.map((result) => {
						// only taking average into account - this isn't necessary correct for bld.
						if (result.average <= prevRound.advancedCondition.level) {
							if ((advancedCompetitors.length + 1) / numResults > 0.75) {
								return advancedCompetitors
							} else {
								advancedCompetitors.push({
									...wcif.persons.find(
										(person) => person.registrantId === result.personId
									),
									result,
								})
							}
						}
					})
					return advancedCompetitors
				default:
					return []
			}
		} else {
			return []
		}
	}
}
