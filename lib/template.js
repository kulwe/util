'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var template = exports.template = function template(text) {
  var code = 'return `' + text + '`';
  return new Function('obj', code);
};
exports.default = template;