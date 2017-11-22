"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var final = exports.final = function final(promise, fn) {
    promise.then(function (res) {
        fn(res);
    });
    promise.catch(function (err) {
        fn(err);
        return Promise.reject(err);
    });
};
exports.default = final;