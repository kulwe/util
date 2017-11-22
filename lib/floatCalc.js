"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getFloatLength = exports.getFloatLength = function getFloatLength(num) {
    var len = void 0;
    try {
        len = num.toString().split(".")[1].length;
    } catch (e) {
        len = 0;
    }
    return len;
};
var removeDot = function removeDot(num) {
    return Number(num.toString().replace(".", ""));
};
var getFloatMaxLength = exports.getFloatMaxLength = function getFloatMaxLength(num1, num2) {
    return Math.max(getFloatLength(num1), getFloatLength(num2));
};
var floatAdd = exports.floatAdd = function floatAdd(arg1, arg2) {
    var max = getFloatMaxLength(arg1, arg2);
    var m = Math.pow(10, max);
    return (arg1 * m + arg2 * m) / m;
};

var floatSub = exports.floatSub = function floatSub(arg1, arg2) {
    var len1 = getFloatLength(arg1);
    var len2 = getFloatLength(arg2);
    var m = Math.pow(10, Math.max(len1, len2));

    var n = len1 >= len2 ? len1 : len2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
};

var floatMul = exports.floatMul = function floatMul(arg1, arg2) {
    var len1 = getFloatLength(arg1);
    var len2 = getFloatLength(arg2);
    var m = len1 + len2;
    return removeDot(arg1) * removeDot(arg2) / Math.pow(10, m);
};

var floatDiv = exports.floatDiv = function floatDiv(arg1, arg2) {
    var len1 = getFloatLength(arg1);
    var len2 = getFloatLength(arg2);
    return removeDot(arg1) / removeDot(arg2) * Math.pow(10, len2 - len1);
};