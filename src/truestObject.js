/**
 * Created by kule on 2017/7/3.
 */
/**
 * 将source中值为undefined的属性去除，返回一个新对象
 * @example
 * const a={a:1,b:null,c=undefined}
 * createTruestObject(a)==>{a:1,b:null}
 * const b=a.m;
 * const c=3;
 * createTruestObject({b,c})==>{c:3}
 * @param {object} source={}
 */
export const createTruestObject=function(source={}){
    const rst={};
    for(let k in source){
        if(typeof source[k]!=='undefined'){
            rst[k]=source[k];
        }
    }
    return rst;
};
export default createTruestObject;