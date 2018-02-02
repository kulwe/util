"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mockProxy = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toArray2 = require("babel-runtime/helpers/toArray");

var _toArray3 = _interopRequireDefault(_toArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findRuntimeMapKey = function findRuntimeMapKey(target, ctx) {
    for (var k in target) {
        if (target[k] === ctx) {
            return k;
        }
    }
};
var mockProxy = exports.mockProxy = function mockProxy(service) {
    console.log(22222);
    return new Proxy(service, {
        apply: function apply(target, ctx, args) {
            console.log(11111);

            var _ref = args || [],
                _ref2 = (0, _toArray3.default)(_ref),
                data = _ref2[0],
                opt = _ref2[1],
                other = _ref2.slice(2);

            var _opt = (0, _extends3.default)({}, opt);
            if (_opt.mock) {
                _opt.mockName = findRuntimeMapKey(target, ctx);
            }
            console.log(_opt);
            return Reflect.apply(target, ctx, [data, _opt].concat((0, _toConsumableArray3.default)(other)));
        }
    });
};
exports.default = mockProxy;