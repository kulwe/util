export const ensureFilterFn=function(filter,defVal='',cond){
    return function(...args){
        const [val]=args;
        const canFilter=cond?cond.apply(this,args):!!val;
        if(!canFilter){
            return defVal;
        }
        return filter.apply(this,args);
    }
};
export default ensureFilterFn;