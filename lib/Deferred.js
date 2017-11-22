"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Deferred = exports.Deferred = function Deferred() {
    var _resolve = void 0,
        _reject = void 0;
    var deferred = new Promise(function (resolve, reject) {
        _resolve = resolve;
        _reject = reject;
    });
    deferred.resolve = _resolve;
    deferred.reject = _reject;
    _resolve = null;
    _reject = null;
    return deferred;
};
exports.default = Deferred;