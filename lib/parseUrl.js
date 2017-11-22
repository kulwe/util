'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.modifyUrl = exports.queryToString = exports.toUrl = exports.parseHash = exports.parseUrlWithHash = exports.parseUrl = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _splitToTail9 = require('./splitToTail');

var _parseSearch = require('./parseSearch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regProtocol = /^([^:]+):\/\/(.+)$/;
var regHost = /^([^:\/]+)(?::(\d+)?)?($|\/$|\/.+$)/;
var regRootPath = /^\/(.*)/;
var _parseUrl = function _parseUrl() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var _splitToTail = (0, _splitToTail9.splitToTail)(url, '#'),
        _splitToTail2 = (0, _slicedToArray3.default)(_splitToTail, 2),
        _url = _splitToTail2[0],
        hash = _splitToTail2[1];

    var _splitToTail3 = (0, _splitToTail9.splitToTail)(_url, '?'),
        _splitToTail4 = (0, _slicedToArray3.default)(_splitToTail3, 2),
        remainUrl = _splitToTail4[0],
        search = _splitToTail4[1];

    var rst = {
        protocol: '',
        host: '',
        port: '',
        pathname: '',
        query: (0, _parseSearch.parseSearch)(search),
        hash: hash
    };
    var protocolMatch = remainUrl.match(regProtocol);
    if (protocolMatch) {
        rst.protocol = protocolMatch[1];
        remainUrl = protocolMatch[2];
    } else {
        rst.pathname = remainUrl;
        return rst;
    }
    var rootPathMatch = remainUrl.match(regRootPath);

    if (rootPathMatch) {
        rst.pathname = rootPathMatch[1];
        return rst;
    }
    var hostMatch = remainUrl.match(regHost);
    if (hostMatch) {
        rst.host = hostMatch[1];
        rst.port = hostMatch[2];
        rst.pathname = hostMatch[3];
    }
    return rst;
};
var parseUrl = exports.parseUrl = function parseUrl(url) {
    return ensureEmpty(_parseUrl(url));
};
var ensureEmpty = function ensureEmpty(rst) {
    for (var key in rst) {
        if (!rst[key]) {
            rst[key] = '';
        }
    }
    return rst;
};

var parseUrlWithHash = exports.parseUrlWithHash = function parseUrlWithHash() {
    var _url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var _splitToTail5 = (0, _splitToTail9.splitToTail)(_url, '#'),
        _splitToTail6 = (0, _slicedToArray3.default)(_splitToTail5, 2),
        url = _splitToTail6[0],
        hashUrl = _splitToTail6[1];

    return {
        url: parseUrl(url),
        hash: parseUrl(hashUrl)
    };
};

var parseHash = exports.parseHash = function parseHash() {
    var _url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var _splitToTail7 = (0, _splitToTail9.splitToTail)(_url, '#'),
        _splitToTail8 = (0, _slicedToArray3.default)(_splitToTail7, 2),
        url = _splitToTail8[0],
        hashUrl = _splitToTail8[1];

    return parseUrl(hashUrl);
};
var toUrl = exports.toUrl = function toUrl() {
    var urlObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var protocol = urlObj.protocol,
        host = urlObj.host,
        port = urlObj.port,
        pathname = urlObj.pathname,
        query = urlObj.query,
        hash = urlObj.hash;

    query = queryToString(query);
    return (protocol || '') + '://' + (host || '') + (port ? ':' + port : '') + (pathname || '/') + '?' + (query || '') + '#' + (hash || '');
};

var queryToString = exports.queryToString = function queryToString(query) {
    var rst = [];
    var val = '';
    for (var key in query) {
        val = query[key];
        rst.push(key + (val ? '=' + val : ''));
    }
    return rst.join('&');
};
var modifyUrl = exports.modifyUrl = function modifyUrl(url) {
    var modify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (urlObj) {
        return urlObj;
    };

    return toUrl(modify(parseUrl(url)));
};