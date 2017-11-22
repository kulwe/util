"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var firstKey = function firstKey(obj) {
    for (var k in obj) {
        return k;
    }
    return null;
};
exports.default = firstKey;