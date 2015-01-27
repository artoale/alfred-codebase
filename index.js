/*jshint node:true*/
'use strict';

var auth = require('./auth.json');
var codebase = require('./src/codebase.js')(auth);
var serializer = require('./src/serializer.js')();

codebase.projects(process.argv[2].toLowerCase()).then(function (data) {
	console.log(serializer.projects(data).toString());
});
