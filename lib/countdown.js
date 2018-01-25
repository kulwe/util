'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.countdown = undefined;

var _padStart = require('lodash/padStart');

var _padStart2 = _interopRequireDefault(_padStart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var countdown = exports.countdown = function countdown(count, fn) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$isPad = _ref.isPad,
        isPad = _ref$isPad === undefined ? false : _ref$isPad;

    var end = new Date().getTime() + count;
    var hourTime = 60 * 60 * 1000;
    var minuteTime = 60 * 1000;
    var secondTime = 1000;
    var down = function down() {
        var now = new Date().getTime();
        var _count = end - now;
        var retain = _count;

        var hour = Math.floor(_count / hourTime);
        retain -= hour * hourTime;
        var minute = Math.floor(retain / minuteTime);
        retain -= minute * minuteTime;
        var second = Math.floor(retain / secondTime);
        var rst = void 0;
        if (_padStart2.default) {
            rst = {
                count: _count,
                hour: (0, _padStart2.default)(hour, 2, '0'),
                minute: (0, _padStart2.default)(minute, 2, '0'),
                second: (0, _padStart2.default)(second, 2, '0')
            };
        } else {
            rst = {
                count: _count,
                hour: hour,
                minute: minute,
                second: second
            };
        }
        fn(rst);
        if (now < end) {
            setTimeout(down, 1000);
        }
    };
    return down;
};
exports.default = countdown;