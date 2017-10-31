/**
 * Created by kule on 2017/7/21.
 */
const regQuestionMark=/^\??/;
export const parseSearch=(search='',unique=false)=>{
    const queryArr=search.replace(regQuestionMark,'').split('&');
    const rst={};
    queryArr.forEach((query)=>{
        if(!query){
            return;
        }
        const [key,val]=query.split('=');
        if(unique){
            rst[key]=val;
            return;
        }
        const rstVal=rst[key];
        rst[key]=rstVal?`${rstVal},${val}`:val;
    });
    return rst;
};
export default parseSearch;