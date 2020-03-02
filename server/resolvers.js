module.exports = {
	Query: {
		hello: () => 'hello'
	},
	Mutation: {
		createCat: (_, { name }) => {
			const cat = new cat({ name })
			return cat.save()
		}
	}
}
