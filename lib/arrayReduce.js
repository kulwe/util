'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayReduce = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var arrayReduce = exports.arrayReduce = function arrayReduce(array, reducer) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return _lodash2.default.reduce(array, function (result, item, key) {
    return result.concat(_lodash2.default.castArray(reducer(item, (0, _extends3.default)({ key: key, array: array, result: result }, args))));
  }, []);
};
exports.default = arrayReduce;