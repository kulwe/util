'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var regBaseName = /[^/\\]+$/;
var regExtName = /(.)(\.[^.]+)?$/;
var getBaseName = exports.getBaseName = function getBaseName(file, hasExt) {
    var name = file.match(regBaseName);
    if (!name) return name;
    if (hasExt) {
        return name[0];
    }
    return name[0].replace(regExtName, '$1');
};
exports.default = getBaseName;