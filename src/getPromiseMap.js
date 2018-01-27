export const getPromiseMap=(mock,{fn=true,value=true}={})=>{
    const rst={};
    for(let k in mock){
        rst[k]=mock[k];
        if(typeof mock[k]=='function'&&fn){
            rst[k]=function(...args){
                return Promise.resolve(mock[k](...args));
            }
        }
        if(typeof mock[k]!='function'&&value){
            rst[k]=function(...args){
                return Promise.resolve(mock[k]);
            }
        }
    }
    return rst;
};
export default getPromiseMap;