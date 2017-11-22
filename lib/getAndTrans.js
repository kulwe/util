'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAndTrans = exports.tpl = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tpl = exports.tpl = function tpl(strings) {
    for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        keys[_key - 1] = arguments[_key];
    }

    return function () {
        for (var _len2 = arguments.length, values = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            values[_key2] = arguments[_key2];
        }

        var dict = values[values.length - 1] || {};
        var result = [strings[0]];
        keys.forEach(function (key, i) {
            var value = Number.isInteger(key) ? values[key] : dict[key];
            result.push(value, strings[i + 1]);
        });
        return result.join('');
    };
};
var getAndTrans = exports.getAndTrans = function getAndTrans(obj, key, trans, def) {
    var value = _lodash2.default.get(obj, key);
    if (_lodash2.default.isString(trans)) {
        trans = _lodash2.default.curry(new Function('tpl', 'val', 'var ts=tpl`' + trans + '`;return ts(val);'))(tpl);
    }
    return value ? trans(value) : def;
};
exports.default = getAndTrans;