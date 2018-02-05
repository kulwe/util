'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addOnOneEvent = exports.addEventNs = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _castArray = require('lodash/castArray');

var _castArray2 = _interopRequireDefault(_castArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getArgs = function getArgs(args) {
    var _args = (0, _slicedToArray3.default)(args, 3),
        eventName = _args[0],
        ns = _args[1],
        fn = _args[2];

    if (typeof ns == 'function') {
        fn = ns;
        ns = '';
    }
    return {
        eventName: eventName,
        fn: fn,
        ns: ns
    };
};

var addEventNs = exports.addEventNs = function addEventNs(event) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$addListener = _ref.addListener,
        addListener = _ref$addListener === undefined ? 'addListener' : _ref$addListener,
        _ref$removeListener = _ref.removeListener,
        removeListener = _ref$removeListener === undefined ? 'removeListener' : _ref$removeListener,
        _ref$removeListeners = _ref.removeListeners,
        removeListeners = _ref$removeListeners === undefined ? 'removeListeners' : _ref$removeListeners;

    var fnsWithNs = {};

    var getFns = function getFns(ns, eventName) {
        var fns = fnsWithNs[ns] || (fnsWithNs[ns] = {});
        if (!eventName) {
            return fns;
        }
        var _fns = fns[eventName] || (fnsWithNs[ns][eventName] = []);
        return _fns;
    };
    var removeFn = function removeFn(ns, eventName, fn) {
        var fns = getFns(ns, eventName);
        if (!eventName) {
            fnsWithNs[ns] = {};
            return;
        }
        if (!fn) {
            fnsWithNs[ns][eventName] = [];
            return;
        }
        var index = fns.indexOf(fn);
        if (index < 0) {
            return;
        }
        fns.splice(index, 1);
    };

    event.on = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _getArgs = getArgs(args),
            eventName = _getArgs.eventName,
            fn = _getArgs.fn,
            ns = _getArgs.ns;

        if (ns && eventName && fn) {
            var fns = getFns(ns, eventName);
            fns.push(fn);
        }
        return event[addListener](eventName, fn);
    };

    var offNs = function offNs(ns, eventName, fn) {
        if (ns && eventName && fn) {
            removeFn(ns, eventName, fn);
            return event[removeListener](eventName, fn);
        }
        if (ns && eventName) {
            var fns = getFns(ns, eventName);
            removeFn(ns, eventName);
            return event[removeListeners](eventName, fns);
        }
        if (ns) {
            var _fns2 = getFns(ns);
            removeFn(ns);
            for (var key in _fns2) {
                event[removeListeners](key, _fns2[key]);
            }
            return event;
        }
    };
    event.off = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        var _getArgs2 = getArgs(args),
            eventName = _getArgs2.eventName,
            fn = _getArgs2.fn,
            ns = _getArgs2.ns;

        if (ns) {
            return offNs(ns, eventName, fn);
        }
        return this[removeListener](eventName, fn);
    };

    event.getNsListeners = getFns;
    return event;
};

var addOnOneEvent = exports.addOnOneEvent = function addOnOneEvent(event) {
    event._on = event.on;
    event.on = function (eventNames, ns, fn) {
        var names = (0, _castArray2.default)(eventNames);
        for (var i = 0; i < names.length; i++) {
            this._on(names[i], ns, fn);
        }
        return this;
    };
    event._off = event.off;
    event.off = function (eventNames, ns, fn) {
        var names = (0, _castArray2.default)(eventNames);
        if (names.length < 1) {
            return this._off('', ns, fn);
        }
        for (var i = 0; i < names.length; i++) {
            this._off(names[i], ns, fn);
        }
        return this;
    };

    event.onOne = function (eventNames, ns, fn) {
        if (!eventNames) {
            return this;
        }
        this.off(eventNames, ns);
        this.on(eventNames, ns, fn);
        return this;
    };
};

exports.default = addEventNs;