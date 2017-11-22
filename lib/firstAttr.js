"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var firstAttr = function firstAttr(obj) {
    for (var k in obj) {
        return obj[k];
    }
    return null;
};
exports.default = firstAttr;