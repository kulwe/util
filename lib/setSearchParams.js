"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var setSearchParams = exports.setSearchParams = function setSearchParams() {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var searchParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new URLSearchParams();

    for (var k in query) {
        searchParams.set(k, query[k]);
    }
    return searchParams;
};
exports.default = setSearchParams;