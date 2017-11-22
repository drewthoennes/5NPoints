var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	cors = require('cors'),
	http = require('http').Server(app)
	path = require('path'),
	mongoose = require('mongoose'),
	session = require('express-session');

var config = require('./config'),
	port = config.port,
	database = config.database;

mongoose.Promise = global.Promise;
mongoose.connect(config.database, function(err, res) {
	if(err) {
		console.log('Error connecting to MongoDB: ' + database + '. ' + err);
	}
	else {
		console.log('Connected to MongoDB: ' + database);
	}
});

var api_route = require('./routes/api'),
	login_route = require('./routes/login'),
	admin_route = require('./routes/admin')

app.use(session({
	secret: 'purduecs',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 36000000,
		secure: false, // Should be true on production
		httpOnly: false
	},
	// store: sessionstore.createSessionStore({ // Need to install sessionstore to use this
	// 	type: 'mongodb',
	// 	host: 'localhost',
	// 	port: 27017,
	// 	dbName: '5npoints',
	// 	collectionName: 'sessions',
	// 	timeout: 10000
	// })
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/', api_route);
app.use('/', login_route);
app.use('/', admin_route);

http.listen(3000, () => {
	console.log('Listening on port 3000');
});
