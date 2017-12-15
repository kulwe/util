'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fs = undefined;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = exports.fs = _bluebird2.default.promisifyAll(_fsExtra2.default);
exports.default = fs;