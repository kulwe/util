'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFetchArgsFn = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defaultsDeep = require('lodash/defaultsDeep');

var _defaultsDeep2 = _interopRequireDefault(_defaultsDeep);

var _setQuery = require('./setQuery');

var _setQuery2 = _interopRequireDefault(_setQuery);

var _setSearchParams = require('./setSearchParams');

var _setSearchParams2 = _interopRequireDefault(_setSearchParams);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFetchArgsFn = function getFetchArgsFn() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref$getHeader = _ref.getHeader,
        getHeader = _ref$getHeader === undefined ? function () {
        return {};
    } : _ref$getHeader,
        _ref$getDefUrlParams = _ref.getDefUrlParams,
        getDefUrlParams = _ref$getDefUrlParams === undefined ? function () {
        return {};
    } : _ref$getDefUrlParams,
        _ref$getDefBody = _ref.getDefBody,
        getDefBody = _ref$getDefBody === undefined ? function () {
        return {};
    } : _ref$getDefBody,
        _def = (0, _objectWithoutProperties3.default)(_ref, ['getHeader', 'getDefUrlParams', 'getDefBody']);

    return function () {
        var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var url = param.url,
            method = param.method,
            _param$type = param.type,
            type = _param$type === undefined ? 'json' : _param$type,
            _option = (0, _objectWithoutProperties3.default)(param, ['url', 'method', 'type']);

        var isGet = method === 'GET';

        var option = (0, _extends3.default)({}, _def, _option);
        var isBodyJson = !isGet && type === 'json';
        var isBodyUrl = !isGet && type === 'url';
        var defBody = getDefBody();
        if (isBodyJson) {
            option.headers['Content-Type'] = 'application/json';
            option.body = JSON.stringify((0, _defaultsDeep2.default)({}, option.body, defBody));
        }
        if (isBodyUrl) {
            option.body = (0, _setSearchParams2.default)((0, _defaultsDeep2.default)({}, option.body, defBody));
        }
        if (isGet) {
            option.body = (0, _defaultsDeep2.default)({}, option.body, defBody);
        }
        var urlParam = Object.assign({}, getDefUrlParams(), isGet ? option.body : {});
        if (isGet) {
            delete option.body;
        }

        option.method = method ? method.toUpperCase() : 'GET';

        option.headers = (0, _defaultsDeep2.default)({}, getHeader(), option.headers);

        option.mode = 'cors';

        return {
            url: (0, _setQuery2.default)(url, urlParam),
            option: option
        };
    };
};
exports.getFetchArgsFn = getFetchArgsFn;
exports.default = getFetchArgsFn;