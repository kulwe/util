'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.promisePool = undefined;

var _final = require('./final');

var _final2 = _interopRequireDefault(_final);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var promisePool = exports.promisePool = function promisePool() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$size = _ref.size,
        size = _ref$size === undefined ? 5 : _ref$size;

    var id = 1;
    var willPools = [];
    var doPools = [];

    var addPool = function addPool(fn) {
        if (doPools.length >= size) {
            willPools.push(fn);
            return;
        }
        return _addPool(fn);
    };
    var _addPool = function _addPool(fn) {
        var _id = id++;
        doPools.push(_id);
        (0, _final2.default)(fn(), function () {
            var index = doPools.indexOf(_id);
            if (index < -1) {
                return;
            }
            doPools.splice(index, 1);
            runWillPool();
        });
        return _id;
    };
    var runWillPool = function runWillPool() {
        if (doPools.length >= size) {
            return;
        }
        var fn = willPools.shift();
        if (!fn) {
            return;
        }
        addPool(fn);
    };

    return addPool;
};
exports.default = promisePool;