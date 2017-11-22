'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var splitString = exports.splitString = function splitString() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var split = arguments[1];

    var rst = str.split(split);
    if (rst.length < 2) {
        return null;
    }
    return rst;
};
exports.default = splitString;