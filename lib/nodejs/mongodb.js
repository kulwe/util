'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCollection = exports.eachParallel = exports.eachSeries = exports.eachSeriesAggregate = exports.eachSeriesWithDb = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mongodb = require('mongodb');

var _Deferred = require('../Deferred');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eachSeriesWithDb = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
        var db = _ref2.db,
            collection = _ref2.collection,
            args = (0, _objectWithoutProperties3.default)(_ref2, ['db', 'collection']);
        var col;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return getCollection({
                            db: db,
                            collection: collection
                        });

                    case 2:
                        col = _context.sent;
                        _context.next = 5;
                        return eachSeries((0, _extends3.default)({
                            collection: col
                        }, args));

                    case 5:
                        return _context.abrupt('return', col._db);

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function eachSeriesWithDb(_x) {
        return _ref.apply(this, arguments);
    };
}();

exports.eachSeriesWithDb = eachSeriesWithDb;
var eachPrepare = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref4) {
        var collection = _ref4.collection,
            cursor = _ref4.cursor;

        var _cursor, count;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return cursor(collection).addCursorFlag('noCursorTimeout', true).snapshot(true);

                    case 2:
                        _cursor = _context2.sent;
                        _context2.next = 5;
                        return _cursor.count(true);

                    case 5:
                        count = _context2.sent;
                        return _context2.abrupt('return', {
                            _cursor: _cursor,
                            count: count
                        });

                    case 7:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function eachPrepare(_x2) {
        return _ref3.apply(this, arguments);
    };
}();

var eachSeriesAggregate = exports.eachSeriesAggregate = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref6) {
        var collection = _ref6.collection,
            aggregate = _ref6.aggregate,
            each = _ref6.each;

        var _count, count, _cursor, current;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return collection.aggregate([].concat((0, _toConsumableArray3.default)(aggregate), [{
                            $count: 'total'
                        }])).toArray();

                    case 2:
                        _count = _context3.sent;
                        count = (0, _get2.default)(_count, '0.total');
                        _context3.next = 6;
                        return collection.aggregate([].concat((0, _toConsumableArray3.default)(aggregate)));

                    case 6:
                        _cursor = _context3.sent;
                        current = 0;

                        console.log('\u672C\u6B21\u5904\u7406\u603B\u6570\u636E\uFF1A' + count + '\u6761');

                    case 9:
                        _context3.next = 11;
                        return _cursor.hasNext();

                    case 11:
                        if (!_context3.sent) {
                            _context3.next = 22;
                            break;
                        }

                        _context3.t0 = each;
                        _context3.next = 15;
                        return _cursor.next();

                    case 15:
                        _context3.t1 = _context3.sent;
                        _context3.next = 18;
                        return (0, _context3.t0)(_context3.t1);

                    case 18:
                        current++;
                        console.log('\u5F53\u524D\u5904\u7406\uFF1A' + current + '/' + count);
                        _context3.next = 9;
                        break;

                    case 22:
                        _context3.next = 24;
                        return _cursor.close();

                    case 24:
                        return _context3.abrupt('return', _context3.sent);

                    case 25:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function eachSeriesAggregate(_x3) {
        return _ref5.apply(this, arguments);
    };
}();

var eachSeries = exports.eachSeries = function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref8) {
        var collection = _ref8.collection,
            cursor = _ref8.cursor,
            each = _ref8.each;

        var _ref9, _cursor, count, current;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return eachPrepare({
                            collection: collection,
                            cursor: cursor
                        });

                    case 2:
                        _ref9 = _context4.sent;
                        _cursor = _ref9._cursor;
                        count = _ref9.count;
                        current = 0;

                        console.log('\u672C\u6B21\u5904\u7406\u603B\u6570\u636E\uFF1A' + count + '\u6761');

                    case 7:
                        _context4.next = 9;
                        return _cursor.hasNext();

                    case 9:
                        if (!_context4.sent) {
                            _context4.next = 20;
                            break;
                        }

                        _context4.t0 = each;
                        _context4.next = 13;
                        return _cursor.next();

                    case 13:
                        _context4.t1 = _context4.sent;
                        _context4.next = 16;
                        return (0, _context4.t0)(_context4.t1);

                    case 16:
                        current++;
                        console.log('\u5F53\u524D\u5904\u7406\uFF1A' + current + '/' + count);
                        _context4.next = 7;
                        break;

                    case 20:
                        _context4.next = 22;
                        return _cursor.close();

                    case 22:
                        return _context4.abrupt('return', _context4.sent);

                    case 23:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function eachSeries(_x4) {
        return _ref7.apply(this, arguments);
    };
}();

var eachParallel = exports.eachParallel = function () {
    var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(_ref11) {
        var collection = _ref11.collection,
            cursor = _ref11.cursor,
            each = _ref11.each,
            _ref11$poolSize = _ref11.poolSize,
            poolSize = _ref11$poolSize === undefined ? 100 : _ref11$poolSize;

        var _ref12, _cursor, count, current, pool, defer, check, done, deferPool, checkAndAddPool, releasePool;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return eachPrepare({
                            collection: collection,
                            cursor: cursor
                        });

                    case 2:
                        _ref12 = _context5.sent;
                        _cursor = _ref12._cursor;
                        count = _ref12.count;
                        current = 0;
                        pool = 0;

                        console.log('\u672C\u6B21\u5904\u7406\u603B\u6570\u636E\uFF1A' + count + '\u6761');
                        defer = (0, _Deferred.Deferred)();

                        check = function check(err) {
                            if (poolSize) {
                                releasePool();
                            }
                            current++;
                            console.log('\u5F53\u524D\u5904\u7406\uFF1A' + current + '/' + count);
                            if (err) {
                                console.log('本次处理错误', err);
                            }
                            if (current >= count) {
                                defer.resolve();
                            }
                        };

                        done = function done() {
                            check();
                        };

                        deferPool = null;

                        checkAndAddPool = function checkAndAddPool() {
                            var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

                            pool += count;
                            console.log('checkAndAddPool:' + pool);
                            if (deferPool) {
                                console.log('deferPool');
                                return deferPool;
                            }
                            if (pool >= poolSize) {
                                console.log('createDefer');
                                deferPool = (0, _Deferred.Deferred)();
                                return deferPool;
                            }
                            console.log('pool free');
                        };

                        releasePool = function releasePool() {
                            pool--;
                            console.log('releasePool:' + pool);
                            if (pool < poolSize && deferPool) {
                                deferPool.resolve();
                                deferPool = null;
                            }
                        };

                    case 14:
                        _context5.next = 16;
                        return _cursor.hasNext();

                    case 16:
                        if (!_context5.sent) {
                            _context5.next = 29;
                            break;
                        }

                        _context5.t0 = each;
                        _context5.next = 20;
                        return _cursor.next();

                    case 20:
                        _context5.t1 = _context5.sent;
                        _context5.t2 = done;
                        _context5.t3 = check;
                        (0, _context5.t0)(_context5.t1).then(_context5.t2).catch(_context5.t3);

                        if (!poolSize) {
                            _context5.next = 27;
                            break;
                        }

                        _context5.next = 27;
                        return checkAndAddPool();

                    case 27:
                        _context5.next = 14;
                        break;

                    case 29:

                        defer.then(function () {
                            _cursor.close();
                        });

                        return _context5.abrupt('return', defer);

                    case 31:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function eachParallel(_x5) {
        return _ref10.apply(this, arguments);
    };
}();

var getCollection = exports.getCollection = function () {
    var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(_ref14) {
        var db = _ref14.db,
            collection = _ref14.collection;

        var _db, col;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.next = 2;
                        return _mongodb.MongoClient.connect(db);

                    case 2:
                        _db = _context6.sent;
                        col = _db.collection(collection);

                        col._db = _db;
                        return _context6.abrupt('return', col);

                    case 6:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function getCollection(_x7) {
        return _ref13.apply(this, arguments);
    };
}();