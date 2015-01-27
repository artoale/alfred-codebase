/*jshint node:true*/
'use strict';

var auth = require('./auth.json');
var fs = require('q-io/fs');

var config = {
	projectCache: './project-list.json'
};

var codebase = require('./src/codebase.js')(auth, config, fs);
var serializer = require('./src/serializer.js')();

codebase.projects(process.argv[2].toLowerCase()).then(function (data) {
	console.log(serializer.projects(data).toString());
});
