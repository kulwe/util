/**
 * Created by kule on 2017/7/20.
 */
export const safeJson=function(json,errVal){
    if(typeof json!='string'){
        return json;
    }
    try{
        json=JSON.parse(json);
    }catch(ex){
        console.log('safeJson失败:');
        console.log(json);
        if(errVal){
            return errVal;
        }
    }
    return json;
};
export default safeJson;