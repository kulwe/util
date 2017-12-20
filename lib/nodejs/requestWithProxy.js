'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.requestWithOptions = exports.requestNoProxy = exports.request = exports.requestWithProxy = exports.getDefaultHeaders = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _http2 = require('http');

var _http3 = _interopRequireDefault(_http2);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _pick = require('lodash/pick');

var _pick2 = _interopRequireDefault(_pick);

var _unGzip = require('./unGzip');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDefaultHeaders = exports.getDefaultHeaders = function getDefaultHeaders() {
    var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return (0, _extends3.default)({
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Connection': 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    }, headers);
};
var requestWithProxy = function requestWithProxy() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var url = _ref.url,
        _ref$headers = _ref.headers,
        headers = _ref$headers === undefined ? {} : _ref$headers,
        _ref$method = _ref.method,
        method = _ref$method === undefined ? 'get' : _ref$method,
        body = _ref.body,
        _ref$proxy = _ref.proxy,
        proxy = _ref$proxy === undefined ? {} : _ref$proxy,
        other = (0, _objectWithoutProperties3.default)(_ref, ['url', 'headers', 'method', 'body', 'proxy']);

    var urlObj = _url2.default.parse(url);
    var options = (0, _extends3.default)({
        method: method.toUpperCase(),
        protocol: 'http:',
        host: proxy.host || '127.0.0.1',
        path: _url2.default.format(url),
        port: proxy.port || 8888,
        headers: getDefaultHeaders((0, _extends3.default)({
            Host: _url2.default.format((0, _pick2.default)(urlObj, ['hostname', 'port']))
        }, headers)),
        body: body
    }, other);
    return requestWithOptions(options);
};
exports.requestWithProxy = requestWithProxy;
var request = exports.request = function request() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (options.proxy) {
        return requestWithProxy(options);
    }
    return requestNoProxy(options);
};
var requestNoProxy = function requestNoProxy() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var url = _ref2.url,
        _ref2$headers = _ref2.headers,
        headers = _ref2$headers === undefined ? {} : _ref2$headers,
        _ref2$method = _ref2.method,
        method = _ref2$method === undefined ? 'get' : _ref2$method,
        body = _ref2.body,
        other = (0, _objectWithoutProperties3.default)(_ref2, ['url', 'headers', 'method', 'body']);

    var urlObj = _url2.default.parse(url);
    var options = (0, _extends3.default)({
        method: method.toUpperCase()
    }, (0, _pick2.default)(urlObj, ['protocol', 'host', 'path', 'port']), {
        headers: getDefaultHeaders(headers),
        body: body
    }, other);
    return requestWithOptions(options);
};
exports.requestNoProxy = requestNoProxy;
var requestWithOptions = function requestWithOptions() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var body = _ref3.body,
        options = (0, _objectWithoutProperties3.default)(_ref3, ['body']);

    return new Promise(function (resolve, reject) {
        var _http = options.protocol == 'https:' ? _https2.default : _http3.default;
        if (body) {
            options.headers = (0, _extends3.default)({
                'Content-Type': 'application/json;charset=UTF-8',
                'Content-Length': Buffer.byteLength(body)
            }, options.headers || {});
        }
        var request = _http.request(options);
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
exports.requestWithOptions = requestWithOptions;
exports.default = request;