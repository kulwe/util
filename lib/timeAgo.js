'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timeAgo = function timeAgo(data, year) {
    if (!data) {
        return data;
    }
    if (!year && data.toString().length === 10) {
        data = (data - 0) * 1000;
    } else if (year) {
        data = data.toString();
    }
    var now = new Date().getTime();
    var time = new Date(data).getTime();
    var span = (now - time) / 1000;
    var text = '';
    if (span < 60) {
        text = '刚刚';
    } else if (span < 3600) {
        text = parseInt(span / 60) + "分钟前";
    } else if (span < 24 * 3600) {
        text = parseInt(span / 3600) + "小时前";
    } else if (span < 31 * 24 * 3600) {
        text = parseInt(span / (24 * 3600)) + "天前";
    } else if (span < 365 * 24 * 3600) {
        text = parseInt(span / (31 * 24 * 3600)) + "月前";
    } else {
        text = parseInt(span / (365 * 24 * 3600)) + "年前";
    }
    return text;
};
exports.default = timeAgo;