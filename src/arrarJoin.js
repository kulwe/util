/**
 * Created by kule on 2017/8/7.
 */
export const arrayJoin=(arr=[],join)=>{
    const len=arr.length;
    if(len<2){
        return arr;
    }
    const rst=[arr[0]];
    for (let i =1; i <len; i++) {
        rst.push(join);
        rst.push(arr[i]);
    }
    return rst;
};
export default arrayJoin;