/**
 * Created by kule on 2017/11/24.
 */
export const safeStringify=function(json,errVal){
    if(typeof json=='string'){
        return json;
    }
    try{
        json=JSON.stringify(json);
    }catch(ex){
        console.log('safeStringify失败:');
        console.log(json);
        if(errVal){
            return errVal;
        }
    }
    return json;
};
export default safeStringify;