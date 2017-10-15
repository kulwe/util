/**
 * Created by kule on 2017/8/7.
 */
export const overFn=function(fn,overFn){
    return function(...args){
        overFn(...args);
        if(fn){
            fn(...args);
        }
    };
};
export default overFn;