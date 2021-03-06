/*jshint mocha:true*/
'use strict';
var chai = require('chai');
var serializerFactory = require('../src/serializer.js');
var serializer;

var expect = chai.expect;

describe('serializer', function () {

    beforeEach(function () {
        serializer = serializerFactory();
    });

    describe('#projects', function () {
        it('should be defined', function () {
            expect(serializer.projects).to.be.a('function');
        });

        it('should generate a root element only if no item provided', function () {
            var result = serializer.projects();
            expect(result.toString()).to.equal('<items/>');
        });

        it('should generate an element for each item', function () {
            var items = [{
                project: {
                    project_id: 1,
                    name: '1',
                    permalink: '1'
                }
            }, {
                project: {
                    project_id: 2,
                    name: '2',
                    permalink: '2'
                }
            }];

            var result = serializer.projects(items);
            expect(result.children.length).to.equal(2);
        });

        it('should add uid arg and autocomplete attributes to each item', function () {
            var items = [{
                project: {
                    project_id: 1,
                    name: '1',
                    permalink: 'permalink'
                }
            }];

            var result = serializer.projects(items);
            expect(result.children[0].attributes.uid).not.to.be.undefined();
            expect(result.children[0].attributes.arg).not.to.be.undefined();
            expect(result.children[0].attributes.autocomplete).not.to.be.undefined();

            expect(result.children[0].attributes.uid.value).to.equal('1');
            expect(result.children[0].attributes.arg.value).to.equal('permalink');
            expect(result.children[0].attributes.autocomplete.value).to.equal('permalink >');
        });
    });
    describe('#tickets', function () {
        it('should be defined', function () {
            expect(serializer.tickets).to.be.a('function');
        });

        it('should generate a root element only if no item provided', function () {
            var result = serializer.tickets();
            expect(result.toString()).to.equal('<items/>');
        });

        it('should generate an element for each item', function () {
            var items = [{
                ticket: {
                    ticket_id: 1,
                    summary: 'summary1',
                    status: {
                        name: 'status1'
                    }
                }
            }, {
                ticket: {
                    ticket_id: 1,
                    summary: 'summary1',
                    status: {
                        name: 'status1'
                    }
                }
            }];

            var result = serializer.tickets(items, 'a-project');
            expect(result.children.length).to.equal(2);
        });

        it('should interpolate the title', function () {
            var items = [{
                ticket: {
                    ticket_id: 1,
                    summary: 'summary1',
                    status: {
                        name: 'status1'
                    }
                }
            }];

            var result = serializer.tickets(items, 'a-project');
            var title = result.children[0].children[0].children[0].value;

            expect(title).to.equal('#1: summary1');
        });

        it('should interpolate the subtitle', function () {
            var items = [{
                ticket: {
                    ticket_id: 1,
                    ticket_type: 'Bug',
                    summary: 'summary1',
                    status: {
                        name: 'status1'
                    }
                }
            }];

            var result = serializer.tickets(items, 'a-project');
            var title = result.children[0].children[1].children[0].value;

            expect(title).to.equal('Bug, status1');
        });

        it('should interpolate the arguments', function () {
            var items = [{
                ticket: {
                    ticket_id: 1,
                    ticket_type: 'Bug',
                    summary: 'summary1',
                    status: {
                        name: 'status1'
                    }
                }
            }];

            var result = serializer.tickets(items, 'a-project');
            var args = result.children[0].attributes;

            expect(args.arg.value).to.equal('a-project/tickets/1');
            expect(args.autocomplete.value).to.equal('a-project > 1');
        });
    });

    describe('#commands', function () {
        it('should be defined', function () {
            expect(serializer.commands).to.be.a('function');
        });

        it('should return a function', function () {
            expect(serializer.commands()).to.be.a('function');
        });

        it('should keep adding commands until called without args', function () {
            var command = serializer.commands();
            var interm = command('title', 'subtitle');

            expect(interm).to.be.a('function');

            interm = interm('title2', 'subtitle2');

            expect(interm).to.be.a('function');

            var final = interm();
            expect(final).to.be.an('object');
        });
    });
});
