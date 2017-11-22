"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var getImageThumbFromFileObj = function getImageThumbFromFileObj(fileObj) {
  return URL.createObjectURL(fileObj);
};

exports.default = getImageThumbFromFileObj;