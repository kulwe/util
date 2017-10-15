/**
 * Created by kule on 2017/8/14.
 */
export const nodeRequire=(...args)=>{
    return global.require(...args);
};
export default nodeRequire;