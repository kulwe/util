'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var safeJson = exports.safeJson = function safeJson(json, errVal) {
    if (typeof json != 'string') {
        return json;
    }
    try {
        json = JSON.parse(json);
    } catch (ex) {
        console.log('safeJson失败:');
        console.log(json);
        if (errVal) {
            return errVal;
        }
    }
    return json;
};
exports.default = safeJson;