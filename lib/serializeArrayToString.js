'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var serializeArrayToString = exports.serializeArrayToString = function serializeArrayToString(arr) {
    var rst = {};
    for (var i = 0, il = arr.length; i < il; i++) {
        var _arr$i = arr[i],
            name = _arr$i.name,
            value = _arr$i.value;

        if (name in rst) {
            rst[name] += ',' + value;
        } else {
            rst[name] = value;
        }
    }
    var rstArr = [];
    for (var k in rst) {
        rstArr.push(k + '=' + rst[k]);
    }
    return rstArr.join('&');
};
exports.default = serializeArrayToString;