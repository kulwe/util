'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.condition = exports.conditionObject = exports.conditionArray = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var flag = {};
var conditionArray = exports.conditionArray = function conditionArray(array) {
    return _lodash2.default.filter(array, function (item) {
        return !(item === flag);
    });
};
var conditionObject = exports.conditionObject = function conditionObject(object) {
    return _lodash2.default.pickBy(object, function (item) {
        return !(item === flag);
    });
};
var condition = exports.condition = function condition(val) {
    for (var _len = arguments.length, conditions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        conditions[_key - 1] = arguments[_key];
    }

    var falseIndex = _lodash2.default.findIndex(conditions, function (cond) {
        if (_lodash2.default.isFunction(cond)) {
            return !cond(val);
        }
        return !cond;
    });
    return falseIndex > -1 ? flag : val;
};