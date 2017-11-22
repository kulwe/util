"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var diffObj = exports.diffObj = function diffObj(data, target) {
    var item = void 0;
    var rst = {};
    for (var k in data) {
        item = data[k];
        if (item == target[k]) {
            continue;
        }
        rst[k] = target[k];
    }
    return rst;
};
exports.default = diffObj;