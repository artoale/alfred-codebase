/*jshint node:true*/
'use strict';
var rest = require('rest');
var basicAuth = require('rest/interceptor/basicAuth');
var mime = require('rest/interceptor/mime');
var pathPrefix = require('rest/interceptor/pathPrefix');
var defaultRequest = require('rest/interceptor/defaultRequest');
var fs = require('q-io/fs');


module.exports = function(auth) {

	var client = rest.wrap(basicAuth, {
        username: auth.user,
        password: auth.pass
    })
    .wrap(mime, {
        accept: 'application/json'
    })
    .wrap(pathPrefix, {
        prefix: 'https://api3.codebasehq.com/'
    })
    .wrap(defaultRequest, {
        params: {
            raw: true
        }
    });

    var projects = function(query) {
        return fs.read('./project-list.json').catch(function(error) {
                return client({
                    path: 'projects'
                }).then(function(data) {
                    var toCache = JSON.stringify(data.entity);
                    fs.write('./project-list.json', toCache);
                    return toCache;
                });
            })
            .then(JSON.parse)
            .then(function(items) {
                return items.filter(function(item) {
                    return item.project.name.toLowerCase().indexOf(query) > -1;
                });
            });

    };


    return {
        projects: projects,
    };

};
