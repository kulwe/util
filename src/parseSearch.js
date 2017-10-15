/**
 * Created by kule on 2017/7/21.
 */
const regQuestionMark=/^\??/;
export const parseSearch=(search='')=>{
    const queryArr=search.replace(regQuestionMark,'').split('&');
    const rst={};
    queryArr.forEach((query)=>{
        if(!query){
            return;
        }
        const [key,val]=query.split('=');
        const rstVal=rst[key];
        rst[key]=rstVal?`${rstVal},${val}`:val;
    });
    return rst;
};