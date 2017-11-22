'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PromiseError = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _Error = function (_Error2) {
    (0, _inherits3.default)(_Error, _Error2);

    function _Error() {
        (0, _classCallCheck3.default)(this, _Error);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_Error.__proto__ || Object.getPrototypeOf(_Error)).call(this, args));

        _this.name = 'Promise Reject Error';
        return _this;
    }

    return _Error;
}(Error);

var PromiseError = exports.PromiseError = function PromiseError(err) {
    var newErr = err;
    if (!err || typeof newErr == 'string') {
        newErr = new _Error(newErr);
    }
    return newErr;
};
exports.default = PromiseError;