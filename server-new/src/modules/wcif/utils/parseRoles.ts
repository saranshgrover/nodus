export default function parseRoles(roles: string[]): RoleType[] {
	let roleTypes: RoleType[] = []
	for (const role of roles) {
		switch (role) {
			case 'delegate':
				roleTypes.push('delegate')
				break
			case 'trainee_delegate':
				roleTypes.push('traineeDelegate')
				break
			case 'organizer':
				roleTypes.push('organizer')
				break
			case 'staff':
				roleTypes.push('staff')
				break
			case 'competitor':
				roleTypes.push('competitor')
				break
		}
	}
	return roleTypes
}
