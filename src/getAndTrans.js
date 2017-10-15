/**
 * Created by liukai on 2017/8/2.
 */
import _ from 'lodash';

/**
 * 转换模板字符串
 * @param strings
 * @param keys
 * @return {Function}
 */
export const tpl = function (strings, ...keys) {
    return (function(...values) {
        var dict = values[values.length - 1] || {};
        var result = [strings[0]];
        keys.forEach(function(key, i) {
            var value = Number.isInteger(key) ? values[key] : dict[key];
            result.push(value, strings[i + 1]);
        });
        return result.join('');
    });
}
/**
 * 获取对象中的值，如果存在则通过函数解析并返回
 * @param obj 对象
 * @param key 路径
 * @param trans 转换函数或模板字符串
 * @param def 默认值
 * @return {*}
 */
export const getAndTrans = function (obj,key,trans,def) {
    let value = _.get(obj,key);
    if(_.isString(trans)){
        trans = _.curry(new Function('tpl','val',`var ts=tpl\`${trans}\`;return ts(val);`))(tpl)
    }
    return value?trans(value):def
};
export default getAndTrans

