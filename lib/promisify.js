"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var nodePromisify = exports.nodePromisify = function nodePromisify(fn) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return new Promise(function (resolve, reject) {
            fn.apply(undefined, args.concat([function (err) {
                for (var _len2 = arguments.length, innerArgs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                    innerArgs[_key2 - 1] = arguments[_key2];
                }

                if (err) {
                    return reject(err);
                }
                return resolve.apply(undefined, innerArgs);
            }]));
        });
    };
};