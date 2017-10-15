/**
 * Created by kule on 2017/7/3.
 */
export const diffObj=function(data,target){
    let item;
    const rst={};
    for(var k in data){
        item=data[k];
        if(item==target[k]){
            continue;
        }
        rst[k]=target[k];
    }
    return rst;
};
export default diffObj;