/**
 * Created by kule on 2017/8/31.
 */
import _get from 'lodash/get';
export const get=(state,path,defVal)=>{
    if(!path){
        return state;
    }
    return _get(state,path,defVal);
};
export const getWithKey=(state,key,path,defVal)=>{
    const _state=_get(state,key);
    return get(_state,path,defVal);
};
export default get;