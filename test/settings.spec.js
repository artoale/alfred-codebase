'use strict';
var chai = require('chai');
var Q = require('q');
var settingsF = require('../src/settings');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var expect = chai.expect;

var fsMock;
var readDeferred;
var settings;
var writeDeferred;

chai.use(sinonChai);

describe('settings', function () {
    beforeEach(function () {
        readDeferred = Q.defer();
        writeDeferred = Q.defer();
        fsMock = {
            read: function () {
                return readDeferred.promise;
            },
            write: function () {
                return writeDeferred.promise;
            }
        };
        settings = settingsF(fsMock, 'fileName');

    });

    describe('#get', function () {
        it('should be defined', function () {
            expect(settings.get).to.be.a('function');
        });

        it('should return the correct item if it exists', function () {
            var content = {
                king: 'in the north'
            };

            readDeferred.resolve(JSON.stringify(content));

            return settings.get('king').then(function (data) {
                expect(data).to.equal('in the north');
            });
        });

        it('should return the whole item if no key specified', function () {
            var content = {
                king: 'in the north'
            };

            readDeferred.resolve(JSON.stringify(content));

            return settings.get().then(function (data) {
                expect(data).to.eql(content);
            });
        });

        it('should create an empty-object json file if it doesnt exist', function () {

            readDeferred.reject({
                code: 'ENOENT'
            });

            sinon.spy(fsMock, 'write');

            writeDeferred.resolve();
            var promise = settings.get();
            return writeDeferred.promise.then(function () {
                expect(fsMock.write).to.have.been.calledWith('fileName', '{}');
                return promise.then(function (data) {
                    expect(data).to.eql({});
                });
            });
        });
    });

    describe('#set', function () {
        it('should be defined', function () {
            expect(settings.set).to.be.a('function');
        });

        it('should set the relevant item if it exists', function () {
            var content = {
                king: 'in the north'
            };

            readDeferred.resolve(JSON.stringify(content));
            sinon.spy(fsMock, 'write');
            writeDeferred.resolve();

            return settings.set('king', 'mad').then(function () {
                expect(fsMock.write).to.have.been.calledWith('fileName', JSON.stringify({
                    king: 'mad'
                }));
            });
        });

        it('should create an empty-object json file first if it doesnt exist', function () {

            readDeferred.reject({
                code: 'ENOENT'
            });

            sinon.spy(fsMock, 'write');

            writeDeferred.resolve();
            var promise = settings.set('king', 'mad');

            return writeDeferred.promise.then(function () {
                expect(fsMock.write).to.have.been.calledWith('fileName', '{}');
                return promise.then(function () {
                    expect(fsMock.write).to.have.been.calledWith('fileName', JSON.stringify({
                        king: 'mad'
                    }));
                });
            });
        });
    });
});

