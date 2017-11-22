'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.flatObjAndIgnoreArray = exports.flatObj = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var flatObj = exports.flatObj = function flatObj(data) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var item = void 0;
    var deepKey = void 0;
    for (var k in data) {
        item = data[k];
        deepKey = key ? key + '.' + k : k;
        if (_lodash2.default.isPlainObject(item) || _lodash2.default.isArray(item)) {
            flatObj(item, deepKey, result);
        } else {
            result[deepKey] = item;
        }
    }
    return result;
};
var flatObjAndIgnoreArray = exports.flatObjAndIgnoreArray = function flatObjAndIgnoreArray(data) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var item = void 0;
    var deepKey = void 0;
    for (var k in data) {
        item = data[k];
        deepKey = key ? key + '.' + k : k;
        if (_lodash2.default.isPlainObject(item)) {
            flatObjAndIgnoreArray(item, deepKey, result);
        } else {
            result[deepKey] = item;
        }
    }
    return result;
};