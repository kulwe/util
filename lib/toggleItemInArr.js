'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toggleItemInArr = undefined;

var _without = require('lodash/without');

var _without2 = _interopRequireDefault(_without);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toggleItemInArr = exports.toggleItemInArr = function toggleItemInArr(item) {
    var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var index = arr.indexOf(item);
    var newArr = void 0;
    var flag = index > -1;
    if (flag) {
        newArr = (0, _without2.default)(arr, item);
    } else {
        newArr = arr.concat(item);
    }
    return {
        index: index,
        flag: flag,
        arr: newArr
    };
};
exports.default = toggleItemInArr;