/*jshint node:true*/
'use strict';


var builder = require('xmlbuilder');

module.exports = function() {
    var projects = function(items) {
        var root = builder.create('items');
        if (!Array.isArray(items)) {
            items = [];
        }
        items.forEach(function(item) {
            var itemRoot = root.ele('item', {
                'uid': item.project.project_id,
                'arg': item.project.permalink,
                'autocomplete': item.project.name
            });

            itemRoot.ele('title', {}, item.project.name);
            itemRoot.ele('subtitle', {}, item.project.group_id + ' (open tickets: ' + item.project.open_tickets + '/' + item.project.total_tickets + ')');
            itemRoot.end();
        });

        root.end();

        return root;
    };

    return {
        projects: projects
    };
};
