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
import _ from 'lodash';
export const createTruestObject=function(source={}){
    return _.reduce(source,(rst,val,key)=>{
        if(val===undefined){
            return rst;
        }
        rst[key]=val;
        return rst;
    },{});
};
export default createTruestObject;