'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createTruestObject = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTruestObject = exports.createTruestObject = function createTruestObject() {
    var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return _lodash2.default.reduce(source, function (rst, val, key) {
        if (val === undefined) {
            return rst;
        }
        rst[key] = val;
        return rst;
    }, {});
};
exports.default = createTruestObject;