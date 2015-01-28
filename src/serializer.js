/*jshint node:true*/
'use strict';


var builder = require('xmlbuilder');

module.exports = function() {

    var _addItem = function (root, autocomplete, arg, title, subtitle, uid) {
        var itemAttr = {
            autocomplete: autocomplete,
            arg: arg
        };
        if (uid) {
            itemAttr.uid = uid;
        }
        var itemRoot = root.ele('item', itemAttr);
        itemRoot.ele('title', {}, title);
        itemRoot.ele('subtitle', {}, subtitle);
        itemRoot.end();
    };

    var commands = function () {
        var root = builder.create('items');
        return function command(title, subtitle) {
            if (title) {
                _addItem(root,'> ' + title, '> ' + title, title,  subtitle, 'cmd-' + title);
                return command;
            } 
            return root;
        };
    };

    var projects = function(items) {
        var root = builder.create('items');
        if (!Array.isArray(items)) {
            items = [];
        }
        items.forEach(function(item) {
            var project = item.project;
            var subtitle = project.group_id + ' (open tickets: ' + project.open_tickets + '/' + project.total_tickets + ')';
            _addItem(root, project.permalink + ' >', project.permalink, project.name, subtitle, project.project_id);
            
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
            var title = '#' + item.ticket.ticket_id + ': ' + item.ticket.summary;
            var subtitle = [item.ticket.ticket_type, item.ticket.status.name];

            if (item.ticket.milestone) {
                subtitle.push(item.ticket.milestone.name);
            }
            if (item.ticket.assignee) {
                subtitle[1] += ' (' + item.ticket.assignee + ')';
            }

            var itemRoot = root.ele('item', {
                'arg': 'projects/' + project + '/tickets/' + item.ticket.ticket_id,
                'autocomplete': project + ' > ' + item.ticket.ticket_id
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
        tickets: tickets,
        commands: commands
    };
};
