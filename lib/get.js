'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getWithKey = exports.get = undefined;

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var get = exports.get = function get(state, path, defVal) {
    if (!path) {
        return state;
    }
    return (0, _get3.default)(state, path, defVal);
};
var getWithKey = exports.getWithKey = function getWithKey(state, key, path, defVal) {
    var _state = (0, _get3.default)(state, key);
    return get(_state, path, defVal);
};
exports.default = get;