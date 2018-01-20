export const inArray=(item,arr)=>{
    for(let i=0,il=arr.length;i<il;i++){
        if(item==arr[i]){
            return true;
        }
    }
    return false;
};
export default inArray;