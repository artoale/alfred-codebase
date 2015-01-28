/*jshint node:true*/
'use strict';

var auth = require('./auth.json');
var fs = require('q-io/fs');

var settingsF = require('./src/settings');
var config = settingsF(fs, process.cwd() + '/codebase-config.json');
var codebase = require('./src/codebase.js')(auth, config.get(), fs);
var serializer = require('./src/serializer.js')();
var workflow = require('./src/workflow')(codebase,serializer, config.get().get('commands'));

var query = process.argv[2] || '';
query = query.trim().toLowerCase();

var tokens = query.split('>').map(function (string) {
    return string.trim();
});


if (query[0] === '>') {
    //Explicit command request "> login"
    workflow.showCommandList(tokens[1]);
} else if (tokens.length === 2) {
    //Per-project opened ticket listing "my-project > query"
    var project = tokens[0];
    query = tokens[1] || '';

    workflow.showTicketList(project, query);
} else if (tokens.length === 1) {
    //Project listing "query"
    workflow.showProjectList(query);
}

