/**
 * Created by kule on 2017/7/7.
 */
import _ from 'lodash';
export const changeKey=(obj,keyPath,newKeyPath,value)=>{
    if(!_.has(obj,keyPath)){
        return;
    }
    _.set(obj,newKeyPath,value||_.get(obj,keyPath));
    _.unset(obj,keyPath);
};

export default changeKey;