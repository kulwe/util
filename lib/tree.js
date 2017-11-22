'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ignoreParent = exports.getLinkTreeMapInstance = exports.getLinkTreeMap = exports.getAllParentsFromLink = exports.getAllChildrenUseMap = exports.getAllChildren = exports.onlyParentUseMap = exports.onlyParent = exports.getChildrenMap = exports.getAllNodes = exports.filterTrees = exports.getAllParentRoots = exports.getAllParents = exports.breadthWalk = exports.treeToSimpleMapRoots = exports.treeToSimpleMap = exports.treeToSimpleDataRoots = exports.treeToSimpleData = exports.postDeepFilterRoots = exports.createReduceRoots = exports.reduceRoots = exports.postDeepFilter = exports.postDeepWalk = exports.preDeepFind = exports.preDeepWalk = exports.getChildren = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getChildren = exports.getChildren = function getChildren(node) {
    var rst = [];
    if (!node.children) {
        return rst;
    }
    rst.push.apply(rst, (0, _toConsumableArray3.default)(node.children));
    _lodash2.default.forEach(node.children, function (child) {
        rst.push.apply(rst, (0, _toConsumableArray3.default)(getChildren(child)));
    });
    return rst;
};
var preDeepWalk = exports.preDeepWalk = function preDeepWalk(node, walk) {
    walk(node);
    if (node.children) {
        _lodash2.default.forEach(node.children, function (child) {
            return preDeepWalk(child, walk);
        });
    }
};
var preDeepFind = exports.preDeepFind = function preDeepFind(node, find) {
    if (find(node) === true) {
        return node;
    }
    var rst = void 0;
    if (node.children) {
        _lodash2.default.forEach(node.children, function (child) {
            rst = preDeepFind(child, find);
            if (rst) {
                return false;
            }
        });
    }
    return rst;
};

var postDeepWalk = exports.postDeepWalk = function postDeepWalk(node, walk) {
    if (node.children) {
        _lodash2.default.forEach(node.children, function (child) {
            return postDeepWalk(child, walk);
        });
    }
    walk(node);
};

var postDeepFilter = exports.postDeepFilter = function postDeepFilter(node, filter) {
    if (node.children) {
        var children = [];
        _lodash2.default.forEach(node.children, function (child) {
            var clone = postDeepFilter(child, filter);
            if (clone) {
                children.push(clone);
            }
        });
        if (children.length < 1 && !filter(node)) {
            return null;
        }
        var rst = _lodash2.default.cloneDeep(_lodash2.default.omit(node, 'children'));
        rst.children = children;
        return rst;
    }
    if (filter(node) === true) {
        return _lodash2.default.cloneDeep(node);
    }
    return null;
};

var reduceRoots = exports.reduceRoots = function reduceRoots(roots, reduce) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
    }

    return _lodash2.default.reduce(roots, function (rst, root) {
        var result = reduce.apply(undefined, [root].concat(args));
        if (result) {
            rst.push(result);
        }
        return rst;
    }, []);
};
var createReduceRoots = exports.createReduceRoots = function createReduceRoots(reduce) {
    return function (roots) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
        }

        var _roots = _lodash2.default.castArray(roots);
        return _lodash2.default.reduce(_roots, function (rst, root) {
            var result = reduce.apply(undefined, [root].concat(args));
            if (result) {
                rst.push(result);
            }
            return rst;
        }, []);
    };
};
var postDeepFilterRoots = exports.postDeepFilterRoots = createReduceRoots(postDeepFilter);

var treeToSimpleData = exports.treeToSimpleData = function treeToSimpleData(node, parentKey, rst) {
    var newNode = _lodash2.default.cloneDeep(_lodash2.default.omit(node, 'children'));
    newNode.parent = parentKey;
    rst.push(newNode);

    if (node.children) {
        var parent = node.key;
        _lodash2.default.forEach(node.children, function (child) {
            treeToSimpleData(child, parent, rst);
        });
    }
};
var treeToSimpleDataRoots = exports.treeToSimpleDataRoots = function treeToSimpleDataRoots(roots) {
    var rst = [];
    _lodash2.default.forEach(roots, function (root) {
        return treeToSimpleData(root, null, rst);
    });
    return rst;
};

var treeToSimpleMap = exports.treeToSimpleMap = function treeToSimpleMap(node, parentKey, rst) {
    var newNode = _lodash2.default.cloneDeep(_lodash2.default.omit(node, 'children'));
    newNode.parent = parentKey;
    rst[node.key] = newNode;

    if (node.children) {
        var parent = node.key;
        _lodash2.default.forEach(node.children, function (child) {
            treeToSimpleMap(child, parent, rst);
        });
    }
};
var treeToSimpleMapRoots = exports.treeToSimpleMapRoots = function treeToSimpleMapRoots(roots) {
    var rst = {};
    _lodash2.default.forEach(roots, function (root) {
        treeToSimpleMap(root, null, rst);
    });
    return rst;
};
var breadthWalk = exports.breadthWalk = function breadthWalk(node, walk, isChild) {
    if (!isChild) {
        walk(node);
    }
    if (node.children) {
        _lodash2.default.forEach(node.children, function (child) {
            walk(child);
        });
        _lodash2.default.forEach(node.children, function (child) {
            breadthWalk(child, walk, true);
        });
    }
};

var getAllParents = exports.getAllParents = function getAllParents(node, rst) {
    if (node.children) {
        rst.push(node);
        _lodash2.default.forEach(node.children, function (child) {
            getAllParents(child, rst);
        });
    }
};
var getAllParentRoots = exports.getAllParentRoots = function getAllParentRoots(roots) {
    var rst = [];
    _lodash2.default.forEach(roots, function (root) {
        getAllParents(root, rst);
    });
    return rst;
};

var filterTrees = exports.filterTrees = function filterTrees(trees, fnPredicate) {
    return _lodash2.default.reduce(trees, function (rst, tree) {
        var children = [];
        getFilterChildren(tree, fnPredicate, children);
        if (_lodash2.default.isEmpty(children)) {
            return rst;
        }
        rst.push((0, _extends3.default)({}, tree, {
            children: children
        }));
    }, []);
};

var getAllNodes = exports.getAllNodes = function getAllNodes() {
    var trees = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var children = _lodash2.default.reduce(trees, function (rst, tree) {
        return rst.concat(getChildren(tree));
    }, []);
    return trees.concat(children);
};

var filterTree = function filterTree(node, fnPredicate) {
    var rst = null;
    if (fnPredicate(node)) {
        rst = _lodash2.default.omit(node, 'children');
        if (node.children) {
            rst.children = _lodash2.default.map(node.children, function (child) {
                return filterTree(child, fnPredicate);
            });
        }
    }
    return rst;
};
var filterTree3 = function filterTree3(node, fnPredicate) {
    var rst = null;
    if (fnPredicate(node)) {
        rst = _lodash2.default.omit(node, 'children');
        if (node.children) {
            rst.children = _lodash2.default.map(node.children, function (child) {
                return filterTree(child, fnPredicate);
            });
        }
    }
    return rst;
};
var filterTree1 = function filterTree1(node, find) {
    var rst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (rst) {
        if (find(node)) {
            rst = _lodash2.default.omit(node, 'children');
        }
    }
    if (node.children) {
        rst.children = _lodash2.default.reduce(node.children, function (rst, child) {
            if (find(child)) {
                rst.push(_lodash2.default.omit(child, 'children'));
            }
            return rst;
        }, []);
        _lodash2.default.forEach(rst.children, function (child) {
            filterTree(child);
            if (find(node)) {
                rst = _lodash2.default.omit(node, 'children');
            }
            walk(child);
        });
        _lodash2.default.forEach(node.children, function (child) {
            breadthWalk(child, walk, true);
        });
    }
};
var generateFind = function generateFind(fn) {
    var find = function find(node) {
        if (fn(node)) {
            return node;
        }
        if (node.children) {
            return _lodash2.default.find(node.children, find);
        }
        return false;
    };
    return find;
};

var getChildrenMap = exports.getChildrenMap = function getChildrenMap() {
    var trees = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key';

    var allNodes = getAllNodes(trees);
    return _lodash2.default.reduce(allNodes, function (rst, node) {
        rst[node[key]] = getChildren(node);
        return rst;
    }, {});
};

var onlyParent = exports.onlyParent = function onlyParent(ids, trees) {
    var childrenMap = getChildrenMap(trees);
    return onlyParentUseMap(childrenMap);
};

var onlyParentUseMap = exports.onlyParentUseMap = function onlyParentUseMap(ids, childrenMap) {
    var allChildrenIds = _lodash2.default.reduce(ids, function (rst, id) {
        return rst.concat(_lodash2.default.map(childrenMap[id], function (child) {
            return child.key;
        }));
    }, []);
    return _lodash2.default.difference(ids, allChildrenIds);
};

var getAllChildren = exports.getAllChildren = function getAllChildren(node) {
    var rst = [];
    if (!node.children) {
        return rst;
    }
    rst.push.apply(rst, (0, _toConsumableArray3.default)(node.children));
    _lodash2.default.forEach(node.children, function (child) {
        rst.push.apply(rst, (0, _toConsumableArray3.default)(getChildren(child)));
    });
    return rst;
};
var getAllChildrenUseMap = exports.getAllChildrenUseMap = function getAllChildrenUseMap(key, map) {
    return _lodash2.default.get(map, key + '.allChildren');
};
var getAllParentsFromLink = exports.getAllParentsFromLink = function getAllParentsFromLink(key, map) {
    var node = map[key];
    var parents = [];
    while (node.parent) {
        parents.push(node.parent);
        node = node.parent;
    }
    return parents;
};

var ensureChildren = function ensureChildren(key, map) {
    var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';

    var keyPath = '' + key + path;
    var children = _lodash2.default.get(map, keyPath);
    if (!children) {
        children = _lodash2.default.set(map, keyPath, []);
    }
    return children;
};
var pushToChildren = function pushToChildren(key, value, map) {
    var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'children';

    var children = ensureChildren(key, map, path);
    children.push(value);
};
var pushToAllChildren = function pushToAllChildren(key, map) {
    var parents = getAllParentsFromLink(key, map);
    _lodash2.default.forEach(parents, function (parentKey) {
        pushToChildren(parentKey, key, map, 'allChildren');
    });
};

var getTreeMap = function getTreeMap(datas) {
    var rst = _lodash2.default.reduce(datas, function (rst, data) {
        var key = data.key,
            parent = data.parent;

        rst.treeMap[key] = {
            key: key,
            parent: parent,
            children: null
        };
        rst.dataMap[key] = data;
        return rst;
    }, {
        treeMap: {},
        dataMap: {}
    });
    return rst;
};

var getLinkTreeMap = exports.getLinkTreeMap = function getLinkTreeMap(datas, _ref) {
    var isAllChildren = _ref.isAllChildren;

    var _getTreeMap = getTreeMap(datas),
        treeMap = _getTreeMap.treeMap,
        dataMap = _getTreeMap.dataMap;

    _lodash2.default.forEach(datas, function (_ref2) {
        var parent = _ref2.parent,
            key = _ref2.key;

        if (!parent) {
            return;
        }
        pushToChildren(parent, key, treeMap);
        if (isAllChildren) {
            pushToAllChildren(key, treeMap);
        }
    });
    return {
        treeMap: treeMap,
        dataMap: dataMap
    };
};

var getLinkTreeMapInstance = exports.getLinkTreeMapInstance = function getLinkTreeMapInstance() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
    }

    var isAllChildren = args[0].isAllChildren;

    var _getLinkTreeMap = getLinkTreeMap.apply(undefined, args),
        treeMap = _getLinkTreeMap.treeMap,
        dataMap = _getLinkTreeMap.dataMap;

    return {
        getAllChildren: isAllChildren ? getAllChildrenUseMap() : getAllChildren
    };
};

var ignoreParent = exports.ignoreParent = function ignoreParent(ids, treeData) {
    var tree = getTreeMap();
};