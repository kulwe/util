/**
 * Created by kule on 2017/10/30.
 */
export const promiseDelay=(time=1000)=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()
        },time);
    });
};
export default promiseDelay;