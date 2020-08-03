export default function createUsername(name: string) {
	return `${name
		.toLowerCase()
		.replace(/\s/g, '')}${Math.random().toString().slice(2, 6)}`
}
