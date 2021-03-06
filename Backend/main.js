var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	cors = require('cors'),
	http = require('http').Server(app)
	path = require('path'),
	mongoose = require('mongoose');

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
	logout_route = require('./routes/logout'),
	admin_route = require('./routes/admin')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors({
	origin: 'http://localhost:8080', //https://fivenpoints.herokuapp.com/
	credentials: true,
	methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
	allowedHeaders: ['Content-Type', '*']
}));

app.use('/', api_route);
app.use('/', login_route);
app.use('/', logout_route);
app.use('/', admin_route);

http.listen(port, () => {
	console.log('Backend running on port ' + port);
});
