var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	cors = require('cors'),
	http = require('http').Server(app)
	path = require('path'),
	mongoose = require('mongoose');

var api_route = require('./routes/api');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/', api_route);

http.listen(3000, () => {
	console.log('Listening on port 3000');
});
