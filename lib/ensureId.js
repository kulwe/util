'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ensureId = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var count = 0;
var ensureId = exports.ensureId = function ensureId(list) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$key = _ref.key,
        key = _ref$key === undefined ? '_wxId' : _ref$key,
        _ref$index = _ref.index,
        index = _ref$index === undefined ? '_wxIndex' : _ref$index,
        _ref$prefix = _ref.prefix,
        prefix = _ref$prefix === undefined ? '_' : _ref$prefix;

    var rst = [];
    for (var i = 0; i < list.length; i++) {
        var _extends2;

        count++;
        rst.push((0, _extends4.default)({}, list[i], (_extends2 = {}, (0, _defineProperty3.default)(_extends2, key, prefix + count), (0, _defineProperty3.default)(_extends2, index, i), _extends2)));
    }
    return rst;
};
exports.default = ensureId;