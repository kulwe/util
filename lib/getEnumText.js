"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getEnumText = exports.getEnumText = function getEnumText(enumMap) {
    var rst = {};
    var item = void 0;
    for (var key in enumMap) {
        item = enumMap[key];
        rst[item.value] = item.text;
    }
    return rst;
};
exports.default = getEnumText;