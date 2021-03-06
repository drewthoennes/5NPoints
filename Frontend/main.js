var express = require('express'),
	path = require('path'),
	serveStatic = require('serve-static')

app = express();
app.use(express.static(__dirname + "/dist"));
app.use('/points', express.static(__dirname + "/dist"));
app.use('/earn', express.static(__dirname + "/dist"));
app.use('/rewards', express.static(__dirname + "/dist"));
app.use('/login', express.static(__dirname + "/dist"));
app.use('/admin', express.static(__dirname + "/dist"));

var port = process.env.PORT || 8080;
app.listen(port);


console.log("Started on port " + port);
