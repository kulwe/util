'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOmitDefaultProps = function getOmitDefaultProps(defaultProps, reactInstance, ReactClass) {
    return (0, _extends3.default)({}, defaultProps, _lodash2.default.omit(reactInstance.props, _lodash2.default.keys(ReactClass.defaultProps)));
};
exports.default = getOmitDefaultProps;