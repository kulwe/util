"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (value) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { reject: false };

    return value instanceof Promise || value.then && value.catch ? value : config.reject ? Promise.reject(value) : Promise.resolve(value);
};

;