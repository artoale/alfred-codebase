/*jshint mocha:true*/
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
                    permalink: '1'
                }
            }];

            var result = serializer.projects(items);
            expect(result.children[0].attributes.uid).not.to.be.undefined();
            expect(result.children[0].attributes.arg).not.to.be.undefined();
            expect(result.children[0].attributes.autocomplete).not.to.be.undefined();

            expect(result.children[0].attributes.uid.value).to.equal('1');
            expect(result.children[0].attributes.arg.value).to.equal('1 >');
            expect(result.children[0].attributes.autocomplete.value).to.equal('1 >');
        });
    });
});
