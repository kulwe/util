/**
 * Created by kule on 2017/3/14.
 */
const regUrlSearch=/^([^?]+)($|(\?.*)$)/;
//向url中设置
export const setQuery=function(url,query={}){
    const urlMatch=url.match(regUrlSearch);
    const baseUrl=urlMatch[1];
    const search=urlMatch[3];

    const newSearch=new URLSearchParams(search);
    for(let k in query){
        newSearch.set(k,query[k]);
    }
    return baseUrl+'?'+newSearch;
};

export default setQuery;