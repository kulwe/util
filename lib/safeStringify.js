'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var safeStringify = exports.safeStringify = function safeStringify(json, errVal) {
    if (typeof json == 'string') {
        return json;
    }
    try {
        json = JSON.stringify(json);
    } catch (ex) {
        console.log('safeStringify失败:');
        console.log(json);
        if (errVal) {
            return errVal;
        }
    }
    return json;
};
exports.default = safeStringify;