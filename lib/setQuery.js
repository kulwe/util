'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var regUrlSearch = /^([^?]+)($|(\?.*)$)/;
var setQuery = exports.setQuery = function setQuery(url) {
    var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var urlMatch = url.match(regUrlSearch);
    var baseUrl = urlMatch[1];
    var search = urlMatch[3];

    var newSearch = new URLSearchParams(search);
    for (var k in query) {
        newSearch.set(k, query[k]);
    }
    return baseUrl + '?' + newSearch;
};

exports.default = setQuery;