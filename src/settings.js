'use strict';

module.exports = function (fs, fileName) {
    var _onError = function (error) {
        if (error.code === 'ENOENT') { //file not found
            return fs.write(fileName, '{}').then(function () {
                return;
            });
        }

        throw error;
    };

    var get = function (key) {
        return fs.read(fileName)
            .catch(_onError)
            .then(function (data) {
                data = data || '{}';
                if (key) {
                    return JSON.parse(data)[key];
                }
                return JSON.parse(data);
            });
    };

    var set = function (key, value) {
        return fs.read(fileName)
            .catch(_onError)
            .then(function (data) {
                data = data;
                var obj = data ? JSON.parse(data) : {};
                obj[key] = value;
                return fs.write(fileName, JSON.stringify(obj, undefined, ' '));
            });
    };

    return {
        get: get,
        set: set
    };
};

