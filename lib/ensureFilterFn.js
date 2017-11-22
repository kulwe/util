'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ensureFilterFn = exports.ensureFilterFn = function ensureFilterFn(filter) {
    var defVal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var cond = arguments[2];

    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var val = args[0];

        var canFilter = cond ? cond.apply(this, args) : !!val;
        if (!canFilter) {
            return defVal;
        }
        return filter.apply(this, args);
    };
};
exports.default = ensureFilterFn;