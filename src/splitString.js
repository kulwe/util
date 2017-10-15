/**
 * Created by kule on 2017/8/7.
 */
export const splitString=(str='',split)=>{
    const rst=str.split(split);
    if(rst.length<2){
        return null;
    }
    return rst;
};
export default splitString;