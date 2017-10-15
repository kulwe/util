/**
 * Created by kule on 2017/9/1.
 */
export const versionLessThen=(ver1='',ver2='')=>{
    let flag=false;
    const ver1Arr=ver1.split('.');
    const ver2Arr=ver2.split('.');
    ver1Arr.forEach((val,index)=>{
        if((val-0)<(ver2Arr[index]-0)){
            flag=true;
            return false;
        }
    });
    return flag;
};
export default versionLessThen;