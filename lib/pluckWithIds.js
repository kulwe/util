'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var pluckWithIds = exports.pluckWithIds = function pluckWithIds() {
    var map = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var _ids = ids.split(',');
    var rst = [];
    var id = void 0;
    for (var i = 0, il = _ids.length; i < il; i++) {
        id = _ids[i];
        if (id && id in map) {
            rst.push(map[id]);
        }
    }
    return rst;
};
exports.default = pluckWithIds;