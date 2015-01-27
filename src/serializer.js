/*jshint node:true*/
'use strict';


var builder = require('xmlbuilder');

module.exports = function() {
    var projects = function(items) {
        var root = builder.create('items');
        items.forEach(function(item) {
            var itemRoot = root.ele('item', {
                'uid': item.project.project_id,
                'arg': JSON.stringify(item),
                'autocomplete': item.project.name
            });

            itemRoot.ele('title', {}, item.project.name);
            itemRoot.ele('subtitle', {}, item.project.group_id);
            itemRoot.end({
                pretty: true
            });
        });

        root.end({
            pretty: true
        });

        return root;
    };

    return {
        projects: projects
    };
};
