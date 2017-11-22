/**
 * Created by kule on 2017/7/21.
 */
const regQuestionMark=/^\??/;
const reg=/([^=]+)=(.*)$/;
export const parseSearch=(search='',unique=false)=>{
    const queryArr=search.replace(regQuestionMark,'').split('&');
    const rst={};
    queryArr.forEach((query)=>{
        if(!query){
            return;
        }
        const queryArr=query.match(reg);
        if(!queryArr){
            return;
        }
        const key=queryArr[1];
        const val=queryArr[2];
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