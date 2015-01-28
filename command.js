/*jshint node:true*/
'use strict';

var query = process.argv[2].trim();

if (query[0] === '>') {
	console.log('executing command...', query.slice(0));
} else {
	console.log('opening ', process.argv[2]);
}
