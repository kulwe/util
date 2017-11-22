"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var isEmptyObject = function isEmptyObject(object) {
    var t;
    for (t in object) {
        return !1;
    }return !0;
};
exports.default = isEmptyObject;