'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getPromiseMap = exports.getPromiseMap = function getPromiseMap(mock) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$fn = _ref.fn,
        fn = _ref$fn === undefined ? true : _ref$fn,
        _ref$value = _ref.value,
        value = _ref$value === undefined ? true : _ref$value;

    var rst = {};

    var _loop = function _loop(k) {
        rst[k] = mock[k];
        if (typeof mock[k] == 'function' && fn) {
            rst[k] = function () {
                return Promise.resolve(mock[k].apply(mock, arguments));
            };
        }
        if (typeof mock[k] != 'function' && value) {
            rst[k] = function () {
                return Promise.resolve(mock[k]);
            };
        }
    };

    for (var k in mock) {
        _loop(k);
    }
    return rst;
};
exports.default = getPromiseMap;