'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.requestWithProxy = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _pick = require('lodash/pick');

var _pick2 = _interopRequireDefault(_pick);

var _unGzip = require('./unGzip');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestWithProxy = exports.requestWithProxy = function requestWithProxy() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        url = _ref.url,
        _ref$headers = _ref.headers,
        headers = _ref$headers === undefined ? {} : _ref$headers,
        _ref$method = _ref.method,
        method = _ref$method === undefined ? 'get' : _ref$method,
        body = _ref.body,
        _ref$proxy = _ref.proxy,
        proxy = _ref$proxy === undefined ? {} : _ref$proxy;

    return new Promise(function (resolve, reject) {
        var urlObj = _url2.default.parse(url);
        if (body) {
            headers['Content-Type'] = 'application/json;charset=UTF-8';
            headers['Content-Length'] = Buffer.byteLength(body);
        }
        var request = _http2.default.request({
            method: method.toUpperCase(),
            path: _url2.default.format(url),
            headers: (0, _extends3.default)({
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Encoding': 'gzip',
                'Accept-Language': 'zh-CN,zh;q=0.8',
                'Connection': 'keep-alive',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
                Host: _url2.default.format((0, _pick2.default)(urlObj, ['hostname', 'port']))
            }, headers),
            protocol: 'http:',
            host: proxy.host || '127.0.0.1',
            port: proxy.port || 8888
        });
        request.on('response', function (res) {
            var statusCode = res.statusCode;

            if (statusCode !== 200) {
                var err = 'error:' + statusCode;
                res.resume();
                reject(err);
                return;
            }
            (0, _unGzip.unGzipRes)(res, function (err, result) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result.toString());
            });
            res.on('error', reject);
        });
        body && request.write(body);
        request.end();
    });
};
exports.default = requestWithProxy;