"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isPromise = exports.isPromise = function isPromise() {
  var promise = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return promise instanceof Promise || promise.then && promise.catch;
};

exports.default = isPromise;