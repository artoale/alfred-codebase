/*jshint node:true*/
'use strict';

var auth = require('./auth.json');
var fs = require('q-io/fs');

var config = {
	projectCache: './project-list.json'
};

var codebase = require('./src/codebase.js')(auth, config, fs);
var serializer = require('./src/serializer.js')();

if (process.argv[3] && process.argv[3] === 'ticket') {
	var queryTokens = process.argv[2].split(' ');
	var project = queryTokens[0];
	var query = queryTokens[1] || '';
} else {
	codebase.projects(process.argv[2].toLowerCase()).then(function (data) {
		console.log(serializer.projects(data).toString());
	});	
}

