var Route = require('./route.js');
var run = require('./socket.io.js');
var bodyParser = require('body-parser');
var express = require("express");
var app = express();
app.use(express.static("public"));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "modules")

Route(app);

var server = app.listen(process.env.PORT || 3000);
var io     = require('socket.io').listen(server);
io.set('match origin protocol', true);
io.set('origins', '*:*');
io.set('log level', 1);
 
var fs = require('fs');
var request = require('request');
io.sockets.on('connection', run);
