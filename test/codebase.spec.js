/*jshint mocha:true, node:true*/
'use strict';

var chai = require('chai');
var expect = chai.expect;
var nock = require('nock');
var Q = require('q');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);

var codebaseFactory = require('../src/codebase.js');

var codebase;
var codebaseServer;
var fsMock;
var readDeferred;
var writeDeferred;

describe('codebase', function () {

    beforeEach(function () {
        var configDeferred = Q.defer();
        readDeferred = Q.defer();
        writeDeferred = Q.defer();
        var authDeferred = Q.defer();
        fsMock = {
            read: function () {
                return readDeferred.promise;
            },
            write: sinon.spy()
        };
        var authMock = {
            get: function () {
                return authDeferred.promise;
            }
        };
        codebase = codebaseFactory(authMock, configDeferred.promise, fsMock);
        authDeferred.resolve({
            user: 'Gandalf',
            pass: 'mellon'
        });
        configDeferred.resolve({
            projectCache: 'you-cannot-pass'
        });

        codebaseServer = nock('https://api3.codebasehq.com', {
            reqheaders: {
                'authorization': 'Basic R2FuZGFsZjptZWxsb24=', //User+pass sha
            }
        });
    });

    describe('#projects', function () {
        it('should be defined', function () {
            expect(codebase.projects).to.be.a('function');
        });

        it('should send request with auth if config file doesnt exist', function () {
            readDeferred.reject();
            codebaseServer.get('/projects?raw=true')
                .reply(200, []);

            var promise = codebase.projects();

            return promise;
        });

        it('should write to the fs when request is complete', function () {
            readDeferred.reject();
            codebaseServer.get('/projects?raw=true')
                .reply(200, []);

            var promise = codebase.projects();

            return promise.then(function () {
                expect(fsMock.write).to.have.been.calledWith('you-cannot-pass', '[]');
            });
        });

        it('should return the parsed elements if file available', function () {
            readDeferred.resolve('[]');

            var promise = codebase.projects();

            return promise.then(function (data) {
                expect(data).to.eql([]);
            });
        });

        it('should return the fetched elements if file not available', function () {
            readDeferred.reject();

            var promise = codebase.projects();
            codebaseServer.get('/projects?raw=true')
                .reply(200, []);

            return promise.then(function (data) {
                expect(data).to.eql([]);
            });
        });
    });
});
