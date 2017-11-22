"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var overFn = exports.overFn = function overFn(fn, _overFn) {
    return function () {
        _overFn.apply(undefined, arguments);
        if (fn) {
            fn.apply(undefined, arguments);
        }
    };
};
exports.default = overFn;