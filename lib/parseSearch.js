'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var regQuestionMark = /^\??/;
var reg = /([^=]+)=(.*)$/;
var parseSearch = exports.parseSearch = function parseSearch() {
    var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var unique = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var queryArr = search.replace(regQuestionMark, '').split('&');
    var rst = {};
    queryArr.forEach(function (query) {
        if (!query) {
            return;
        }
        var queryArr = query.match(reg);
        if (!queryArr) {
            return;
        }
        var key = queryArr[1];
        var val = queryArr[2];
        if (unique) {
            rst[key] = val;
            return;
        }
        var rstVal = rst[key];
        rst[key] = rstVal ? rstVal + ',' + val : val;
    });
    return rst;
};
exports.default = parseSearch;