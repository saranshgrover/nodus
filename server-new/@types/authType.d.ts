interface AuthType {
	queryType: QueryType
	roles: RoleType[]
}

type QueryType = 'competition' | 'user'
