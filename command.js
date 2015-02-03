/*jshint node:true*/
'use strict';

var query = process.argv[2].trim();
var tokens, command;

var fs = require('q-io/fs');
var settingsF = require('./src/settings');
var auth = settingsF(fs, process.cwd() + '/auth.json');
var codebaseF = require('./src/codebase');
var commands = {
    login: function (arg) {
        var user;
        var pass;

        if (arg) {
            user = arg.split(':')[0];
            pass = arg.split(':')[1];
            auth.set('user', user).then(function () {
                return auth.set('pass', pass);
            }).then(function () {
                console.log('Authentication details updated');
            }).catch(function (error) {
                console.error('Error while setting credential', error);
                console.log('Error while setting credential', error);
            });
        } else {
            var command = 'open ' + process.cwd() + '/auth.json';
            console.error('doing:', command);
            require('child_process').exec(command);
            console.log('Opening auth file');
        }
    },
    update: function () {
        auth.get()
            .then(function (authInfo) {
                var config = settingsF(fs, process.cwd() + '/codebase-config.json');
                var codebase = codebaseF(authInfo, config, fs);
                return codebase.updateProjectList();
            })
            .then(function () {
                console.log('Project list successfully updated');
            })
            .catch(function (error) {
                console.dir(error.stack);
            });
    },
    'set-domain': function (arg) {
        auth.set('domain', arg)
            .then(function () {
                console.log('Domain saved successfully');
            })
            .catch(function (err) {
                console.log('There was an error while saving');
                console.error('There was an error while saving:', err);
            });
    }
};

if (query[0] === '>') {
    query = query.replace('>', '').trim();
    tokens = query.split(/\s/);
    command = commands[tokens[0]];
    if (typeof command === 'function') {
        command(tokens[1]);
    } else {
        console.log('Unknown command', tokens[0]);
    }
} else {
    auth.get('domain').then(function (domain) {
        if (domain) {
            var command = 'open ' + domain + '/projects/' + query;
            require('child_process').exec(command);
        } else {
            console.log('Please set your actual domain e.g. http://my-company.codebasehq.com');
        }
    });
}

