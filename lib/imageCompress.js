'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.imageCompress = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _imageCompressor = require('image-compressor');

var _imageCompressor2 = _interopRequireDefault(_imageCompressor);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imageCompress = exports.imageCompress = function imageCompress(file, options) {
    var _options = _lodash2.default.defaultsDeep(options, {
        limitSize: 4 * 1000 * 1000
    });
    if (file.size < _options.limitSize) {
        return Promise.resolve(file);
    }
    return compress(file, _options);
};

var getMaxAttrAndScale = function getMaxAttrAndScale(_ref) {
    var width = _ref.width,
        height = _ref.height;
    var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;

    if (width > height) {
        return {
            width: width * scale
        };
    }
    return {
        height: height * scale
    };
};
var compress = function compress(file, options) {
    var tryCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    if (tryCount > 2) {
        return Promise.resolve(file);
    }
    return _compress(file, options).then(function (result) {
        var minImage = result.file || {};
        if (minImage.size < options.limitSize) {
            return minImage;
        }
        tryCount++;
        return compress(file, (0, _extends3.default)({}, options, getMaxAttrAndScale(result.imageAttr)), tryCount);
    });
};
var _compress = function _compress(file, options) {
    var _image = new _imageCompressor2.default();
    return _image.compress(file, options);
};

exports.default = imageCompress;