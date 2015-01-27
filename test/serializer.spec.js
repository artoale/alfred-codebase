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
	});
});