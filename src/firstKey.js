/**
 * Created by kule on 2017/5/8.
 */
const firstKey=(obj)=>{
    for(var k in obj){
        return k;
    }
    return null;
};
export default firstKey;