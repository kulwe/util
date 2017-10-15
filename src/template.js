/**
 * Created by kule on 2017/7/20.
 */
export const template=(text)=>{
    const code='return `'+text+'`';
    return new Function('obj',code);
};
export default template;