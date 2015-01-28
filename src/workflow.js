/*jshint node:true*/
'use strict';


module.exports = function workflowF(codebase, serializer, commandsDef) {

    var showCommandList = function (query) {
        var commands = serializer.commands();
        Object.keys(commandsDef).forEach(function (commandKey) {
            var commandDef = commandsDef[commandKey];
            if (commandKey.indexOf(query) > -1) {
                commands(commandKey, commandDef);
            }
        });
        var xml = commands().toString();
        console.log(xml);
    };

    var showTicketList = function (project, query) {
        return codebase.tickets(project, query).then(function (data) {
            console.log(serializer.tickets(data, project).toString());
        });
    };
    
    var showProjectList = function (query) {
        return codebase.projects(query).then(function (data) {
            console.log(serializer.projects(data).toString());
        });
    };

    return {
        showProjectList: showProjectList,
        showTicketList: showTicketList,
        showCommandList: showCommandList
    };
};
