"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var asyncWrap = exports.asyncWrap = function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
};
var getAsyncGet = exports.getAsyncGet = function getAsyncGet(app) {
    return function (path, fn) {
        app.get(path, asyncWrap(fn));
    };
};
var asyncPost = exports.asyncPost = function asyncPost(app) {
    return function (path, fn) {
        app.post(path, asyncWrap(fn));
    };
};