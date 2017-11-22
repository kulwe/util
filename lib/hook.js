'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.postHook = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postHook = exports.postHook = function postHook(obj, path, fn) {
    var _fn = _lodash2.default.get(obj, path, null);
    _lodash2.default.set(obj, path, function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _fn && _fn.call.apply(_fn, [this].concat(args));
        fn.call.apply(fn, [this].concat(args));
    });
    return obj;
};