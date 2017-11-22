'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var getSexValueByKey = function getSexValueByKey(key) {
   if (!key) return '';
   if (key == 1) return '先生';
   if (key == 2) return '女士';
};
exports.default = getSexValueByKey;