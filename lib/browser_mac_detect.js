'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var regs = [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i, /(macintosh|mac(?=_powerpc)\s)/i];
var isMac = exports.isMac = function isMac() {
    var userAgent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var reg = void 0;
    for (var i = 0, il = regs.length; i < il; i++) {
        reg = regs[i];
        if (reg.test(userAgent)) {
            return true;
        }
    }
    return false;
};