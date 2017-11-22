'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var versionLessThen = exports.versionLessThen = function versionLessThen() {
    var ver1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var ver2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var flag = false;
    var ver1Arr = ver1.split('.');
    var ver2Arr = ver2.split('.');
    ver1Arr.forEach(function (val, index) {
        if (val - 0 < ver2Arr[index] - 0) {
            flag = true;
            return false;
        }
    });
    return flag;
};
exports.default = versionLessThen;