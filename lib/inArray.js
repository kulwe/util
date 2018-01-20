"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var inArray = exports.inArray = function inArray(item, arr) {
    for (var i = 0, il = arr.length; i < il; i++) {
        if (item == arr[i]) {
            return true;
        }
    }
    return false;
};
exports.default = inArray;