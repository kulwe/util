'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var totalTime = function totalTime(data, minUnit, startUnit) {
    if (!data || !parseInt(data)) {
        return data;
    }
    var duration = _moment2.default.duration(data, 'ms');
    var isValid = startUnit ? false : true;
    var times = [{
        key: 'year',
        unit: '年',
        value: duration.get('y')
    }, {
        key: 'month',
        unit: '个月',
        value: duration.get('M')
    }, {
        key: 'day',
        unit: '天',
        value: duration.get('d')
    }, {
        key: 'hour',
        unit: '时',
        value: duration.get('h')
    }, {
        key: 'minute',
        unit: '分',
        value: duration.get('m')
    }, {
        key: 'second',
        unit: '秒',
        value: duration.get('s')
    }];
    var text = [];
    _.forEach(times, function (item) {
        if (item.key == startUnit) {
            isValid = true;
            item.value = parseInt(duration.as(startUnit));
        }
        if (isValid && item.value) {
            text.push([item.value, item.unit].join(''));
        }
        if (item.key == minUnit) {
            isValid = false;
        }
    });
    return text.join('');
};
exports.default = totalTime;