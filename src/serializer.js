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

    var tickets = function (items, project) {
        var root = builder.create('items');
        if (!Array.isArray(items)) {
            items = [];
        }
        items.forEach(function(item) {
            var title = item.ticket.ticket_id + '#: ' + item.ticket.summary;
            var subtitle = [item.ticket.ticket_type, item.ticket.status.name];

            if (item.ticket.milestone) {
                subtitle.push(item.ticket.milestone.name);
            }
            if (item.ticket.assignee) {
                subtitle[1] += ' (' + item.ticket.assignee + ')';
            }

            var itemRoot = root.ele('item', {
                'arg': 'projects/' + project + '/tickets/' + item.ticket.ticket_id,
                'autocomplete': title
            });

            itemRoot.ele('title', {}, title);
            itemRoot.ele('subtitle', {}, subtitle.join(', '));
            itemRoot.end();
        });

        root.end();

        return root;
    };

    return {
        projects: projects,
        tickets: tickets
    };
};
