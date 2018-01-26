export const getEnumText=(enumMap)=>{
    let rst={};
    let item;
    for(let key in enumMap){
        item=enumMap[key];
        rst[item.value]=item.text;
    }
    return rst;
};
export default getEnumText;