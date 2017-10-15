/**
 * Created by kule on 2017/7/20.
 */
export const safeJson=function(json){
    if(typeof json!='string'){
        return json;
    }
    try{
        json=JSON.parse(json);
    }catch(ex){
        console.log('safeJson失败:');
        console.log(json);
    }
    return json;
};
export const safeStringify=function(json){
    if(typeof json=='string'){
        return json;
    }
    try{
        json=JSON.stringify(json);
    }catch(ex){
        console.log('safeStringify失败:');
        console.log(json);
    }
    return json;
};