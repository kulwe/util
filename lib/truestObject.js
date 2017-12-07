'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var createTruestObject = exports.createTruestObject = function createTruestObject() {
    var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var rst = {};
    for (var k in source) {
        if (typeof source[k] !== 'undefined') {
            rst[k] = source[k];
        }
    }
    return rst;
};
exports.default = createTruestObject;