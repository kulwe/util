'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasAndUpdate = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasAndUpdate = exports.hasAndUpdate = function hasAndUpdate(obj, keyPath) {
    var updater = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (val) {
        return val;
    };

    if (_lodash2.default.has(obj, keyPath)) {
        _lodash2.default.set(obj, keyPath, updater(_lodash2.default.get(obj, keyPath)));
    }
};

exports.default = hasAndUpdate;