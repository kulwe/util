'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseSearch = undefined;

var _parseSearch2 = require('./parseSearch');

var _parseSearch3 = _interopRequireDefault(_parseSearch2);

var _he = require('he');

var _he2 = _interopRequireDefault(_he);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseSearch = exports.parseSearch = function parseSearch() {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return _parseSearch3.default.apply(undefined, [_he2.default.decode(search)].concat(args));
};
exports.default = parseSearch;