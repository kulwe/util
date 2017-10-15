/**
 * Created by kule on 2017/7/3.
 */
import _ from 'lodash';
import flatObj from './flatObj';
export const splitKeyByDot=function(data,dot='.'){
    let keys;
    const rst={};
    const flatData=flatObj(data);
    for(let k in flatData){
        keys=k.split(dot);
        _.set(rst,keys,flatData[k]);
    }
    return rst;
};

export default splitKeyByDot;