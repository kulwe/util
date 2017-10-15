/**
 * Created by kule on 2017/9/7.
 */
import _ from 'lodash';
export const postHook=(obj,path,fn)=>{
    const _fn=_.get(obj,path,null);
    _.set(obj,path,function(...args){
        _fn&&_fn.call(this,...args);
        fn.call(this,...args);
    });
    return obj;
};