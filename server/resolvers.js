let models = require('./models/Wcif')

var GraphQLSchema = require('graphql').GraphQLSchema
var GraphQLObjectType = require('graphql').GraphQLObjectType
var GraphQLList = require('graphql').GraphQLList
var GraphQLObjectType = require('graphql').GraphQLObjectType
var GraphQLNonNull = require('graphql').GraphQLNonNull
var GraphQLID = require('graphql').GraphQLID
var GraphQLString = require('graphql').GraphQLString
var GraphQLInt = require('graphql').GraphQLInt
var GraphQLDate = require('graphql-date')

const convertModelToSchema = (model, name) => {
    let output = `var ${name}Type = new GraphQLObjectType({
        name: ${name},
        fields: function() {
            return {
                _id: {
                    type: GraphQLString
                },
                
            }
        }
    })`
}

var wcifType = new GraphQLObjectType({
    name: 'wcif',
    fields: function() {
        return {
            _id: {
                type: GraphQLString
            },
            name: {
                type: GraphQLString
            },
            id: {
                type: GraphQLString
            },
            competitorLimit: {
                type: GraphQLInt
            }
        }
    }
})

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function() {
        return {
            wcifCompetitions: {
                type: new GraphQLList(wcifType),
                resolve: function() {
                    const competitions = models.WcifModel.find().exec()
                    if (!competitions) {
                        throw new Error('Error')
                    }
                    return competitions
                }
            },
            wcifCompetition: {
                type: wcifType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function(root, params) {
                    const compDetails = models.WcifModel.findById(
                        params.id
                    ).exec()
                    if (!compDetails) {
                        throw new Error('Error')
                    }
                    return compDetails
                }
            }
        }
    }
})

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function() {
        return {
            addWcifComp: {
                type: wcifType,
                args: {
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    competitorLimit: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    persons: {
                        type: [PersonType]
                    }
                },
                resolve: function(root, params) {
                    const comp = new models.WcifModel(params)
                    // const logoModel = new LogoModel(params)
                    // const newLogo = logoModel.save()
                    const newComp = comp.save()
                    if (!newComp) {
                        throw new Error('Error')
                    }
                    return newComp
                }
            }
        }
    }
})

// var mutation = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: function() {
//         return {
//             addLogo: {
//                 type: logoType,
//                 args: {
//                     text: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     color: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     fontSize: {
//                         type: new GraphQLNonNull(GraphQLInt)
//                     },
//                     backgroundColor: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     borderColor: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     borderRadius: {
//                         type: new GraphQLNonNull(GraphQLInt)
//                     },
//                     borderWidth: {
//                         type: new GraphQLNonNull(GraphQLInt)
//                     },
//                     padding: {
//                         type: new GraphQLNonNull(GraphQLInt)
//                     },
//                     margin: {
//                         type: new GraphQLNonNull(GraphQLInt)
//                     }
//                 },
//                 resolve: function(root, params) {
//                     const logoModel = new LogoModel(params)
//                     const newLogo = logoModel.save()
//                     if (!newLogo) {
//                         throw new Error('Error')
//                     }
//                     return newLogo
//                 }
//             },
//             updateLogo: {
//                 type: logoType,
//                 args: {
//                     id: {
//                         name: 'id',
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     text: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     color: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     fontSize: {
//                         type: new GraphQLNonNull(GraphQLInt)
//                     },
//                     backgroundColor: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     borderColor: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     borderRadius: {
//                         type: new GraphQLNonNull(GraphQLInt)
//                     },
//                     borderWidth: {
//                         type: new GraphQLNonNull(GraphQLInt)
//                     },
//                     padding: {
//                         type: new GraphQLNonNull(GraphQLInt)
//                     },
//                     margin: {
//                         type: new GraphQLNonNull(GraphQLInt)
//                     }
//                 },
//                 resolve(root, params) {
//                     return LogoModel.findByIdAndUpdate(
//                         params.id,
//                         {
//                             text: params.text,
//                             color: params.color,
//                             fontSize: params.fontSize,
//                             lastUpdate: new Date(),
//                             backgroundColor: params.backgroundColor,
//                             borderColor: params.borderColor,
//                             borderRadius: params.borderRadius,
//                             borderWidth: params.borderWidth,
//                             padding: params.padding,
//                             margin: params.margin
//                         },
//                         function(err) {
//                             if (err) return next(err)
//                         }
//                     )
//                 }
//             },
//             removeLogo: {
//                 type: logoType,
//                 args: {
//                     id: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     }
//                 },
//                 resolve(root, params) {
//                     const remLogo = LogoModel.findByIdAndRemove(
//                         params.id
//                     ).exec()
//                     if (!remLogo) {
//                         throw new Error('Error')
//                     }
//                     return remLogo
//                 }
//             }
//         }
//     }
// })

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation })
