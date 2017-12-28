import without from 'lodash/without';
export const toggleItemInArr=(item,arr=[])=>{
    const index=arr.indexOf(item);
    let newArr;
    const flag=index>-1;
    if(flag){
        newArr=without(arr,item);
    }else{
        newArr=arr.concat(item);
    }
    return {
        index,
        flag,
        arr:newArr
    };
};
export default toggleItemInArr;