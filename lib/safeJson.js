'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var safeJson = exports.safeJson = function safeJson(json) {
    if (typeof json != 'string') {
        return json;
    }
    try {
        json = JSON.parse(json);
    } catch (ex) {
        console.log('safeJson失败:');
        console.log(json);
    }
    return json;
};
var safeStringify = exports.safeStringify = function safeStringify(json) {
    if (typeof json == 'string') {
        return json;
    }
    try {
        json = JSON.stringify(json);
    } catch (ex) {
        console.log('safeStringify失败:');
        console.log(json);
    }
    return json;
};