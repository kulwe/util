export const serializeArrayToString=(arr)=>{
    const rst={};
    for(let i=0,il=arr.length;i<il;i++){
        let {name,value}=arr[i];
        if((name in rst)){
            rst[name]+=(','+value);
        }else{
            rst[name]=value;
        }
    }
    let rstArr=[];
    for(let k in rst){
        rstArr.push(k+'='+rst[k]);
    }
    return rstArr.join('&');
};
export default serializeArrayToString;