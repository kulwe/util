"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});


var closest = function closest(dom, className) {
    var pDom = dom;
    var reg = new RegExp("\\b" + className + "\\b");
    while (pDom) {
        if (reg.test(pDom.className)) {
            return pDom;
        }
        pDom = pDom.parentElement;
    }
};

exports.default = closest;