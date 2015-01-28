/*jshint node:true*/
'use strict';
var rest = require('rest');
var basicAuth = require('rest/interceptor/basicAuth');
var mime = require('rest/interceptor/mime');
var pathPrefix = require('rest/interceptor/pathPrefix');
var defaultRequest = require('rest/interceptor/defaultRequest');



module.exports = function(auth, config, fs) {

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
        return config.get('projectCache').then(fs.read.bind(fs)).catch(function(err) {
                console.error(err);
                return client({
                    path: 'projects'
                }).then(function(data) {
                    var toCache = JSON.stringify(data.entity);
                    config.get('projectCache').then(function (projectCache) {
                        fs.write(projectCache, toCache);
                    });
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

    var tickets = function(project, query) {
        return client({
            path: project + '/tickets',
            params: {
                query: 'resolution:open ' + query
            }
        }).then(function (data) {
            return data.entity;
        });
    };

    return {
        projects: projects,
        tickets: tickets,
    };

};
