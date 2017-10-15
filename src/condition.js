/**
 * Created by kule on 2017/5/17.
 */
import _ from 'lodash';
const flag={};
export const conditionArray=(array)=>{
    return _.filter(array,(item)=>{
        return !(item===flag);
    });
};
export const conditionObject=(object)=>{
    return _.pickBy(object,(item)=>{
        return !(item===flag);
    });
};
export const condition=(val,...conditions)=>{
    const falseIndex=_.findIndex(conditions,(cond)=>{
        if(_.isFunction(cond)){
            return !cond(val);
        }
        return !cond;
    });
    return falseIndex>-1?flag:val;
};