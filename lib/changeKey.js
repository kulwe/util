'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changeKey = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var changeKey = exports.changeKey = function changeKey(obj, keyPath, newKeyPath, value) {
    if (!_lodash2.default.has(obj, keyPath)) {
        return;
    }
    _lodash2.default.set(obj, newKeyPath, value || _lodash2.default.get(obj, keyPath));
    _lodash2.default.unset(obj, keyPath);
};

exports.default = changeKey;