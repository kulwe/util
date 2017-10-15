/**
 * Created by kule on 2017/5/25.
 */
import _ from 'lodash';
export const getChildren = (node) => {
    const rst = [];
    if (!node.children) {
        return rst;
    }
    rst.push(...node.children);
    _.forEach(node.children, (child) => {
        rst.push(...getChildren(child))
    });
    return rst;
};
export const preDeepWalk=(node,walk)=>{
    walk(node);
    if(node.children){
        _.forEach(node.children,child=>preDeepWalk(child,walk));
    }
};
export const preDeepFind=(node,find)=>{
    if(find(node)===true){
        return node;
    }
    let rst;
    if(node.children){
        _.forEach(node.children,(child)=>{
            rst=preDeepFind(child,find);
            if(rst){
                return false;
            }
        });
    }
    return rst;
};

export const postDeepWalk=(node,walk)=>{
    if(node.children){
        _.forEach(node.children,child=>postDeepWalk(child,walk));
    }
    walk(node);
};

export const postDeepFilter=(node,filter)=>{
    if(node.children){
        const children=[];
        _.forEach(node.children,(child)=>{
            const clone=postDeepFilter(child,filter);
            if(clone){
                children.push(clone);
            }
        });
        if(children.length<1&&!filter(node)){
            return null;
        }
        const rst=_.cloneDeep(_.omit(node,'children'));
        rst.children=children;
        return rst;
    }
    if(filter(node)===true){
        return _.cloneDeep(node)
    }
    return null;
};

export const reduceRoots=(roots,reduce,...args)=>{
    return _.reduce(roots,(rst,root)=>{
        const result=reduce(root,...args);
        if(result){
            rst.push(result);
        }
        return rst;
    },[]);
};
export const createReduceRoots=(reduce)=>(roots,...args)=>{
    const _roots=_.castArray(roots);
    return _.reduce(_roots,(rst,root)=>{
        const result=reduce(root,...args);
        if(result){
            rst.push(result);
        }
        return rst;
    },[]);
};
export const postDeepFilterRoots=createReduceRoots(postDeepFilter);

export const treeToSimpleData=(node,parentKey,rst)=>{
    const newNode=_.cloneDeep(_.omit(node,'children'));
    newNode.parent=parentKey;
    rst.push(newNode);

    if(node.children){
        const parent=node.key;
        _.forEach(node.children,(child)=>{
            treeToSimpleData(child,parent,rst);
        });
    }
};
export const treeToSimpleDataRoots=(roots)=>{
    const rst=[];
    _.forEach(roots,(root)=>{
        return treeToSimpleData(root,null,rst);
    });
    return rst;
};

export const treeToSimpleMap=(node,parentKey,rst)=>{
    const newNode=_.cloneDeep(_.omit(node,'children'));
    newNode.parent=parentKey;
    rst[node.key]=newNode;

    if(node.children){
        const parent=node.key;
        _.forEach(node.children,(child)=>{
            treeToSimpleMap(child,parent,rst);
        });
    }
};
export const treeToSimpleMapRoots=(roots)=>{
    const rst={};
    _.forEach(roots,(root)=>{
        treeToSimpleMap(root,null,rst);
    });
    return rst;
};
export const breadthWalk=(node,walk,isChild)=>{
    if(!isChild){
        walk(node);
    }
    if(node.children){
        _.forEach(node.children,child=>{
            walk(child);
        });
        _.forEach(node.children,child=>{
            breadthWalk(child,walk,true);
        });
    }
};

export const getAllParents=(node,rst)=>{
    if(node.children){
        rst.push(node);
        _.forEach(node.children,(child)=>{
            getAllParents(child,rst);
        })
    }
};
export const getAllParentRoots=(roots)=>{
    const rst=[];
    _.forEach(roots,(root)=>{
        getAllParents(root,rst);
    });
    return rst;
};

export const filterTrees=(trees,fnPredicate)=>{
    return _.reduce(trees,(rst,tree)=>{
        const children=[];
        getFilterChildren(tree,fnPredicate,children);
        if(_.isEmpty(children)){
            return rst;
        }
        rst.push({
            ...tree,
            children
        })
    },[]);
};

export const getAllNodes = (trees=[]) => {
    const children = _.reduce(trees, (rst, tree) => {
        return rst.concat(getChildren(tree));
    }, []);
    return trees.concat(children);
};

const filterTree=(node,fnPredicate)=>{
    let rst=null;
    if(fnPredicate(node)){
        rst=_.omit(node,'children');
        if(node.children){
            rst.children=_.map(node.children,child=>{
                return filterTree(child,fnPredicate);
            })
        }
    }
    return rst;
};
const filterTree3=(node,fnPredicate)=>{
    let rst=null;
    if(fnPredicate(node)){
        rst=_.omit(node,'children');
        if(node.children){
            rst.children=_.map(node.children,child=>{
                return filterTree(child,fnPredicate);
            })
        }
    }
    return rst;

};
const filterTree1=(node,find,rst={})=>{
    if(rst){
        if(find(node)){
            rst=_.omit(node,'children');
        }
    }
    if(node.children){
        rst.children=_.reduce(node.children,(rst,child)=>{
            if(find(child)){
                rst.push(_.omit(child,'children'))
            }
            return rst;
        },[]);
        _.forEach(rst.children,child=>{
            filterTree(child);
            if(find(node)){
                rst=_.omit(node,'children');
            }
            walk(child);
        });
        _.forEach(node.children,child=>{
            breadthWalk(child,walk,true);
        });
    }

};
const generateFind=(fn)=>{
    const find=(node)=>{
        if(fn(node)){
            return node;
        }
        if(node.children){
            return _.find(node.children,find);
        }
        return false;
    };
    return find;
};

export const getChildrenMap = (trees=[],key='key') => {
    const allNodes = getAllNodes(trees);
    return _.reduce(allNodes, (rst, node) => {
        rst[node[key]] = getChildren(node);
        return rst;
    }, {});
};


//对数组的节点进行过滤，移除一些节点，这些节点的父节点已经在数组中
export const onlyParent = (ids, trees) => {
    const childrenMap = getChildrenMap(trees);
    return onlyParentUseMap(childrenMap);
};

export const onlyParentUseMap = (ids, childrenMap) => {
    const allChildrenIds = _.reduce(ids, (rst, id) => {
        return rst.concat(_.map(childrenMap[id], child => child.key));
    }, []);
    return _.difference(ids, allChildrenIds);
};

export const getAllChildren = (node) => {
    const rst = [];
    if (!node.children) {
        return rst;
    }
    rst.push(...node.children);
    _.forEach(node.children, (child) => {
        rst.push(...getChildren(child))
    });
    return rst;
};
export const getAllChildrenUseMap = (key,map) => {
    return _.get(map,`${key}.allChildren`);
};
export const getAllParentsFromLink=(key,map)=>{
    let node=map[key];
    const parents=[];
    while(node.parent){
        parents.push(node.parent);
        node=node.parent;
    }
    return parents;
};

const ensureChildren=(key,map,path='children')=>{
    const keyPath=`${key}${path}`;
    let children=_.get(map,keyPath);
    if(!children){
        children=_.set(map,keyPath,[]);
    }
    return children;
};
const pushToChildren=(key,value,map,path='children')=>{
    let children=ensureChildren(key,map,path);
    children.push(value);
};
const pushToAllChildren=(key,map)=>{
    const parents=getAllParentsFromLink(key,map);
    _.forEach(parents,(parentKey)=>{
        pushToChildren(parentKey,key,map,'allChildren');
    });
};

const getTreeMap=(datas)=>{
    const rst=_.reduce(datas,(rst,data)=>{
        const {key,parent}=data;
        rst.treeMap[key]={
            key,
            parent,
            children:null
        };
        rst.dataMap[key]=data;
        return rst;
    },{
        treeMap:{},
        dataMap:{}
    });
    return rst;
};

//LinkTreeMap结构如下
//1|
// |-2|
// |  |-4
// |-5
//key  parent  children  allChildren
//1   null    [2,5]     [2,4,5]
//2   1       [4]       [4]
//4   2       []        []
//5   1       []        []
export const getLinkTreeMap=(datas,{isAllChildren})=>{
    const {treeMap,dataMap}=getTreeMap(datas);
    _.forEach(datas,({parent,key})=>{
        if(!parent){
            return;
        }
        pushToChildren(parent,key,treeMap);
        if(isAllChildren){
            pushToAllChildren(key,treeMap);
        }
    });
    return {
        treeMap,
        dataMap
    };
};

export const getLinkTreeMapInstance=(...args)=>{
    const [{isAllChildren}]=args;
    const {treeMap,dataMap}=getLinkTreeMap(...args);
    return {
        getAllChildren:isAllChildren?getAllChildrenUseMap():getAllChildren,
    }
};

/*treeSimpleData=[
    {id:'1',parent:null,prop:''},
    {id:'2',parent:'1',prop:''},
    {id:'3',parent:'1',prop:''},
    {id:'4',parent:'3',prop:''},
]*/
/*treeData=[
    {id:'1',prop:'',children:[
        {id:'2',prop:''},
        {id:'3',prop:'',children:[
            {id:'4',prop:''},
        ]},
    ]}
];*/
export const ignoreParent=(ids,treeData)=>{
    const tree=getTreeMap()
};
