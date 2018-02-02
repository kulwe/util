/**
 * Created by kule on 2017/5/18.
 */
let count=0;
export const ensureId=function(list,{
    key='_wxId',
    index='_wxIndex',
    prefix='_'
}={}){
    const rst=[];
    for(let i=0;i<list.length;i++){
        count++;
        rst.push({
            ...list[i],
            [key]:prefix+count,
            [index]:i
        })
    }
    return rst;
};
export default ensureId;