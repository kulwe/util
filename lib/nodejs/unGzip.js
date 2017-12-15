'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.unGzip = exports.unGzipRes = undefined;

var _zlib = require('zlib');

var _zlib2 = _interopRequireDefault(_zlib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unGzipRes = exports.unGzipRes = function unGzipRes(res, cb) {
    var rawData = [];
    var encoding = res.headers['content-encoding'];
    res.on('data', function (chunk) {
        return rawData.push(chunk);
    });
    res.on('end', function () {
        var rst = Buffer.concat(rawData);
        unGzip(encoding, rst).then(function (data) {
            cb(null, data);
        }).catch(cb);
    });
};
var unGzip = exports.unGzip = function unGzip(encoding, data) {
    return new Promise(function (resolve, reject) {
        var cb = function cb(err, buffer) {
            if (err) {
                reject(err);
                return;
            }
            resolve(buffer);
        };
        if (encoding === 'gzip') {
            _zlib2.default.gunzip(data, cb);
            return;
        }
        if (encoding === 'deflate') {
            _zlib2.default.deflate(data, cb);
            return;
        }
        cb(null, data);
    });
};
exports.default = unGzip;