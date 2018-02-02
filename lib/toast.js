'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateToast = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _remove = require('lodash/remove');

var _remove2 = _interopRequireDefault(_remove);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateToast = function generateToast() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        show = _ref.show,
        hide = _ref.hide,
        update = _ref.update;

    var showCount = 0;
    var toasts = [];
    var currentId = 0;
    var _hide = function _hide(id) {
        (0, _remove2.default)(toasts, function (item) {
            return item.id == id;
        });
        if (toasts.length > 0) {
            var _toasts = toasts[toasts.length - 1],
                args = _toasts.args,
                _id = _toasts.id;

            if (currentId == _id) {
                return;
            }
            update(args);
            currentId = _id;
            return;
        }
        hide();
    };

    var _show = function _show() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var id = showCount++;

        var _args$duration = args.duration,
            duration = _args$duration === undefined ? 0 : _args$duration,
            mask = args.mask,
            _args = (0, _objectWithoutProperties3.default)(args, ['duration', 'mask']);

        toasts.push({
            id: id,
            args: _args,
            duration: duration
        });

        setTimeout(function () {
            _hide(id);
        }, duration);

        var opt = (0, _extends3.default)({}, args, {
            duration: 24 * 60 * 60 * 1000 });
        currentId = id;
        if (toasts.length == 1) {
            show(opt);
        } else {
            update(opt);
        }
        return {
            id: id,
            hide: function hide() {
                _hide(id);
            }
        };
    };

    var hideAll = function hideAll() {
        toasts = [];
        hide();
    };
    return {
        show: _show,
        hide: _hide,
        hideAll: hideAll
    };
};
exports.generateToast = generateToast;
exports.default = generateToast;