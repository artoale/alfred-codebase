/*jshint node:true*/
'use strict';

var query = process.argv[2].trim();

if (query[0] === '>') {
	console.log('executing command...', query.slice(0));
} else if (query.indexOf('>') > -1) {
	//enter on project item
	var project = query.split('>')[0].trim();
	console.log('opening project:', project);
} else {
	console.log('openin ticket:', process.argv[2]);
}
