'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createStore = exports.resetAppStore = exports.setAppStore = exports.getAppStore = undefined;

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAppStore = exports.getAppStore = function getAppStore(keyPath) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'app';

    var store = localStorage[key];
    if (!store) {
        return {};
    }
    try {
        store = JSON.parse(store);
        return keyPath ? (0, _get2.default)(store, keyPath) : store;
    } catch (ex) {
        return {};
    }
};
var setAppStore = exports.setAppStore = function setAppStore(obj) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'app';

    var storage = getAppStore('', key);
    Object.assign(storage, obj);
    localStorage[key] = JSON.stringify(storage);
};
var resetAppStore = exports.resetAppStore = function resetAppStore(obj) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'app';

    localStorage[key] = JSON.stringify(obj);
};

var createStore = exports.createStore = function createStore(key) {
    return {
        get: function get(keyPath) {
            return getAppStore(keyPath, key);
        },
        set: function set(obj) {
            return setAppStore(obj, key);
        },
        reset: function reset(obj) {
            return resetAppStore(obj, key);
        }
    };
};