/**
 * Created by kule on 2017/7/7.
 */
import _ from 'lodash';
export const hasAndUpdate=(
    obj,keyPath,
    updater=val=>val
)=>{
    if(_.has(obj,keyPath)){
        _.set(obj,keyPath,updater(_.get(obj,keyPath)));
    }
};

export default hasAndUpdate;