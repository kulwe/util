'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deepJson = undefined;

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _safeJson = require('./safeJson');

var _safeJson2 = _interopRequireDefault(_safeJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deepJson = exports.deepJson = function deepJson(json) {
    var rst = (0, _safeJson2.default)(json);
    if ((0, _isArray2.default)(rst)) {
        for (var i = 0, il = rst.length; i < il; i++) {
            if (typeof rst[i] == 'string') {
                rst[k] = deepJson(rst[i]);
            }
        }
    } else if ((0, _isPlainObject2.default)(rst)) {
        for (var _k in rst) {
            if (typeof rst[_k] == 'string') {
                rst[_k] = deepJson(rst[_k]);
            }
        }
    }
    return rst;
};
exports.default = deepJson;