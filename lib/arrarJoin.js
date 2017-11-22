"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var arrayJoin = exports.arrayJoin = function arrayJoin() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var join = arguments[1];

    var len = arr.length;
    if (len < 2) {
        return arr;
    }
    var rst = [arr[0]];
    for (var i = 1; i < len; i++) {
        rst.push(join);
        rst.push(arr[i]);
    }
    return rst;
};
exports.default = arrayJoin;