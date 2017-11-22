"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getRelateTop = exports.getRelateTop = function getRelateTop(dom) {
    var relateDom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var top = 0;
    while (dom && dom !== relateDom) {
        top += dom.offsetTop;
        dom = dom.offsetParent;
    }
    return top;
};

var getRelateWindowHeight = exports.getRelateWindowHeight = function getRelateWindowHeight(dom) {
    var top = getRelateTop(dom);
    return window.innerHeight - top;
};