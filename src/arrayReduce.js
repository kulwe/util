/**
 * Created by kule on 2017/6/8.
 */
import _ from 'lodash';
/**
 * 对数组做reduce操作，reducer返回的结果生成新数组，如果返回空数组[]，
 * 则新数组中将移除此item，若数组中有多个值则添加到该位置
 * @example
 * const arr=[1,2,3,4,5]
 * const rst=arrayReduce(arr,(item)=>{
 *      if(item==2){
 *          return ['a','b'];
 *      }
 *      if(item==4){
 *          return [];
 *      }
 *      return item;
 * });
 * //结果:[1,'a','b',3,5]
 * @param array
 * @param reducer
 */
export const arrayReduce=(array,reducer,args={})=>{
    return _.reduce(array,(result,item,key)=>{
        return result.concat(_.castArray(reducer(item,{key,array,result,...args})));
    },[]);
};
export default arrayReduce;