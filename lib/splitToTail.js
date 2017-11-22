'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.splitToTail = undefined;

var _tail = require('lodash/tail');

var _tail2 = _interopRequireDefault(_tail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var splitToTail = exports.splitToTail = function splitToTail(str, splitMark) {
    var arr = str.split(splitMark);
    return [arr[0], (0, _tail2.default)(arr).join('')];
};
exports.default = splitToTail;