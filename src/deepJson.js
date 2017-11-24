/**
 * Created by kule on 2017/11/24.
 */
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import safeJson from './safeJson';

export const deepJson=(json)=>{
    let rst=safeJson(json);
    if(isArray(rst)){
        for(let i=0,il=rst.length;i<il;i++){
            if(typeof rst[i]=='string'){
                rst[k]=deepJson(rst[i]);
            }
        }
    }else if(isPlainObject(rst)){
        for(let k in rst){
            if(typeof rst[k]=='string'){
                rst[k]=deepJson(rst[k]);
            }
        }
    }
    return rst;
};
export default deepJson;