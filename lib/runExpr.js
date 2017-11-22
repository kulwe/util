'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var runExpr = exports.runExpr = function runExpr(expr) {
    var _args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!expr) {
        return !!expr;
    }
    if (_.isBoolean(expr)) {
        return expr;
    }
    var body = void 0;
    if (_.isString(expr)) {
        expr = {
            expr: expr
        };
    }
    if (_.isPlainObject(expr)) {
        var _expr = expr,
            _fn = _expr.fn,
            args = _expr.args;

        if (_fn) {
            body = 'const fn=(' + _fn + ');return fn(args)';
        } else if (expr.expr) {
            body = 'const rst=(' + expr.expr + ');return rst';
        }
        _args = Object.assign({}, _args, args);
    }
    var fn = new Function('args', body);
    return fn(_args);
};
exports.default = runExpr;