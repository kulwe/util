/**
 * Created by kule on 2017/11/24.
 */
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';

export const deepJson=(json)=>{
    let rst=JSON.parse(json);
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