'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ajaxUploadWhenTaskDone = exports.ajaxUpload = undefined;

var _upload = require('./upload');

var _upload2 = _interopRequireDefault(_upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ajaxUpload = exports.ajaxUpload = _upload2.default;
var ajaxUploadWhenTaskDone = exports.ajaxUploadWhenTaskDone = function ajaxUploadWhenTaskDone(task) {
    var _abort = false;
    var abortHandle = false;
    var abort = function abort() {
        if (abortHandle) {
            return abortHandle();
        }
        if (!_abort) {
            _abort = true;
        }
    };
    task.then(function () {
        if (_abort) {
            return;
        }
        abortHandle = _upload2.default.apply(undefined, arguments);
    });
    return {
        abort: abort
    };
};
exports.default = ajaxUpload;