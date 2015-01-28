/*jshint node:true*/
'use strict';

var query = process.argv[2].trim();
var tokens, command;

var commands = {
    login: function (arg) {
        if (arg) {
            console.log('performing login:', arg);
        } else {
            console.log('Starting server...');
        }
    }
};

if (query[0] === '>') {
    query = query.replace('>', '').trim();
    tokens = query.split(/\s/);
    command = commands[tokens[0]];
    if (typeof command === 'function') {
        command(tokens[1]);
    } else {
	   console.log('executing command...', query.slice(0));
    }
} else {
	console.log('opening ', process.argv[2]);
}
