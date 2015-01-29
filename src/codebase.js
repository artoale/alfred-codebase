/*jshint node:true*/
'use strict';
var rest = require('rest');
var basicAuth = require('rest/interceptor/basicAuth');
var mime = require('rest/interceptor/mime');
var pathPrefix = require('rest/interceptor/pathPrefix');
var defaultRequest = require('rest/interceptor/defaultRequest');

module.exports = function (auth, config, fs) {

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

    var _now = function () {
        return +(new Date());
    };

    var _testLastUpdate = function (val) {
        var now = _now();
        return config.get('last-update')
            .then(function (lastUpdate) {
                if ((now - lastUpdate) > (1000 * 60 * 60 * 24)) { //update list once a day
                    throw {};
                }
                return val;
            });
    };

    var projects = function (query) {
        return config.get('projectCache')
            .then(fs.read.bind(fs))
            .then(_testLastUpdate)
            .catch(updateProjectList)
            .then(JSON.parse)
            .then(function (items) {
                return items.filter(function (item) {
                    return item.project.name.toLowerCase().indexOf(query) > -1;
                });
            });
    };

    var updateProjectList = function () {
        return client({
            path: 'projects'
        }).then(function (data) {
            var toCache = JSON.stringify(data.entity);
            config.get('projectCache').then(function (projectCache) {
                fs.write(projectCache, toCache);
                config.set('last-update', _now());
            });
            return toCache;
        });
    };

    var tickets = function (project, query) {
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
        updateProjectList: updateProjectList,
        tickets: tickets,
    };

};

