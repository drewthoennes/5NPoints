var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	cors = require('cors'),
	http = require('http').Server(app)
	path = require('path'),
	mongoose = require('mongoose'),
	session = require('express-session'),
	cookieParser = require('cookie-parser');

var config = require('./config'),
	port = process.env.PORT || config.port,
	database = process.env.MONGODB_URI || config.database;

mongoose.Promise = global.Promise;
mongoose.connect(database, function(err, res) {
	if(err) {
		console.log('Error connecting to MongoDB: ' + err);
	}
	else {
		console.log('Connected to MongoDB');
	}
});

var api_route = require('./routes/api'),
	login_route = require('./routes/login'),
	admin_route = require('./routes/admin')

app.use(cookieSession({
	name: 'session', // This is the default
	secret: 'purduecs', // Needs to be the same as express session secret
	maxAge: 36000000
}));
app.use(session({
	secret: 'purduecs',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 36000000,
		secure: true, // Turned to true, check functionality
		httpOnly: false
	}
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/', api_route);
app.use('/', login_route);
app.use('/', admin_route);

http.listen(port, () => {
	console.log('Backend running on port ' + port);
});
