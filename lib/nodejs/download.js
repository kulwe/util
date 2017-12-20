'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.download = exports.createGetHttpAgent = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _http2 = require('http');

var _http3 = _interopRequireDefault(_http2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createGetHttpAgent = exports.createGetHttpAgent = function createGetHttpAgent() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$isHttp = _ref.isHttp,
        isHttp = _ref$isHttp === undefined ? false : _ref$isHttp;

    var downloadAgent = null;
    return function () {
        if (downloadAgent) {
            return downloadAgent;
        }
        var _http = isHttp ? _http3.default : _https2.default;
        return downloadAgent = new _http.Agent({
            keepAlive: true,
            maxSockets: 100,
            maxFreeSockets: 100
        });
    };
};

var getHttpAgent = createGetHttpAgent({
    isHttp: true
});
var getHttpsAgent = createGetHttpAgent();

var download = exports.download = function download(url, filePath) {
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _config$isHttp = config.isHttp,
        isHttp = _config$isHttp === undefined ? false : _config$isHttp;


    return new Promise(function (resolve, reject) {
        var urlConfig = _url2.default.parse(url);
        var _http = isHttp ? _http3.default : _https2.default;
        var agent = isHttp ? getHttpAgent() : getHttpsAgent();
        _http.get((0, _extends3.default)({}, urlConfig, {
            agent: agent
        }), function (res) {
            if (res.statusCode !== 200) {
                reject(res);
                res.resume();
                return;
            }
            res.pipe(_fs2.default.createWriteStream(filePath)).on('finish', resolve).on('error', reject);
        });
    });
};
exports.default = download;