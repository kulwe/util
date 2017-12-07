"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var promiseDelay = exports.promiseDelay = function promiseDelay() {
    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;

    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, time);
    });
};
exports.default = promiseDelay;