'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPathFnWithCwd = exports.getPathFn = exports.getPathWidthCwd = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _cwd = process.cwd();
var getPathWidthCwd = exports.getPathWidthCwd = function getPathWidthCwd() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return _path2.default.join.apply(_path2.default, [_cwd].concat(args));
};
var getPathFn = exports.getPathFn = function getPathFn() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    return function () {
        for (var _len3 = arguments.length, args2 = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args2[_key3] = arguments[_key3];
        }

        return _path2.default.join.apply(_path2.default, args.concat(args2));
    };
};
var getPathFnWithCwd = exports.getPathFnWithCwd = function getPathFnWithCwd() {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
    }

    return function () {
        for (var _len5 = arguments.length, args2 = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args2[_key5] = arguments[_key5];
        }

        return _path2.default.join.apply(_path2.default, [_cwd].concat(args, args2));
    };
};
exports.default = getPathWidthCwd;