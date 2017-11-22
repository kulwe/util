'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.splitKeyByDot = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _flatObj = require('./flatObj');

var _flatObj2 = _interopRequireDefault(_flatObj);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var splitKeyByDot = exports.splitKeyByDot = function splitKeyByDot(data) {
    var dot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';

    var keys = void 0;
    var rst = {};
    var flatData = (0, _flatObj2.default)(data);
    for (var k in flatData) {
        keys = k.split(dot);
        _lodash2.default.set(rst, keys, flatData[k]);
    }
    return rst;
};

exports.default = splitKeyByDot;