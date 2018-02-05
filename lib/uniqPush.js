"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var uniqPush = exports.uniqPush = function uniqPush() {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var items = [];
    for (var i = 0, il = args.length; i < il; i++) {
        var item = args[i];
        if (arr.indexOf(item) > -1) {
            continue;
        }
        items.push(item);
    }
    return arr.push.apply(arr, items);
};
exports.default = uniqPush;