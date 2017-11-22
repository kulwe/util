'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _noop = require('./noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bindArg = function bindArg() {
    for (var _len = arguments.length, bindArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        bindArgs[_key - 1] = arguments[_key];
    }

    var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _noop2.default;

    return function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        fn.apply(undefined, bindArgs.concat(args));
    };
};
exports.default = bindArg;