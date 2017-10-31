export const setSearchParams=function(query={},searchParams=new URLSearchParams){
    for(let k in query){
        searchParams.set(k,query[k]);
    }
    return searchParams;
};
export default setSearchParams;