/**
 * Created by kule on 2017/5/8.
 */
const firstAttr=(obj)=>{
    for(var k in obj){
        return obj[k];
    }
    return null;
};
export default firstAttr;