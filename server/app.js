require('dotenv').config()
var express = require('express')
var mongoose = require('mongoose')
var graphqlHTTP = require('express-graphql')
var schema = require('./resolvers/resolvers.js')
var cors = require('cors')
var passport = require('passport')
const auth = require('./auth')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const http = require('http')
const {
	MONGOLAB_URI,
	PRODUCTION,
	COOKIE_SECRET,
	CLIENT_ORIGIN,
} = require('./config')

const init = async () => {
	const app = express()
	console.log(MONGOLAB_URI)
	app.use(
		'*',
		cors({
			origin: CLIENT_ORIGIN,
			credentials: true,
		})
	)
	// app.use(logger('dev'))
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))
	// app.use(express.static(path.join(__dirname, 'public')))
	await mongoose
		.connect(MONGOLAB_URI, {
			promiseLibrary: require('bluebird'),
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('connection successful'))
		.catch((err) => console.error(err))

	// Authentication

	const sessionOptions = {
		secret: COOKIE_SECRET,
		saveUninitialized: false, // don't create session until something stored
		resave: false, // don't save session if unmodified,
		proxy: true,
		cookie: {
			httpOnly: true,
			secure: false,
			// Note: This may be temporary. sameSite should be true but requires work to set up server and client on same URL.
			sameSite: 'none',
		},
		store: new MongoStore({
			mongooseConnection: mongoose.connection,
		}),
	}

	const expressSession = session(sessionOptions)
	app.set('trust proxy', 1)
	app.use(passport.initialize())
	app.use(expressSession)
	app.use(passport.session())
	app.use('/auth', auth(passport))

	// GraphQL

	app.use(
		'/graphql',
		cors({ origin: CLIENT_ORIGIN, credentials: true }),
		graphqlHTTP((req) => {
			return {
				schema: schema,
				rootValue: global,
				graphiql: true,
				context: {
					user: req.session.passport ? req.session.passport.user : undefined,
				},
			}
		})
	)

	// catch 404 and forward to error handler

	function normalizePort(val) {
		var port = parseInt(val, 10)

		if (isNaN(port)) {
			// named pipe
			return val
		}

		if (port >= 0) {
			// port number
			return port
		}

		return false
	}
	var port = normalizePort(process.env.PORT || '3000')
	app.set('port', port)

	/**
	 * Create HTTP server.
	 */

	var server = http.createServer(app)

	/**
	 * Listen on provided port, on all network interfaces.
	 */

	server.listen(port)
	server.on('error', onError)
	function onError(error) {
		if (error.syscall !== 'listen') {
			throw error
		}

		var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

		// handle specific listen errors with friendly messages
		switch (error.code) {
			case 'EACCES':
				console.error(bind + ' requires elevated privileges')
				process.exit(1)
				break
			case 'EADDRINUSE':
				console.error(bind + ' is already in use')
				process.exit(1)
				break
			default:
				throw error
		}
	}

	return app
}

/**
 * Event listener for HTTP server "listening" event.
 */

try {
	const app = init()
	module.exports = app
} catch (e) {
	console.log('error')
}
