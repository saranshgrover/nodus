/**
 *
 * @param date Original date
 * @param numberOfDays Number of days to add. 1 will add a single day
 */
export function addDays(dateStr: string, numberOfDays: number) {
	const date = new Date(dateStr)
	date.setDate(date.getDate() + numberOfDays)
	return formatDate(date)
}

export function formatDate(d: Date) {
	var month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear()

	if (month.length < 2) month = '0' + month
	if (day.length < 2) day = '0' + day

	return [year, month, day].join('-')
}
