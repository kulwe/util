/**
 * Created by kule on 2017/9/1.
 */
export const nodePromisify=(fn)=>{
    return function(...args){
        return new Promise((resolve,reject)=>{
            fn(...args,(err,...innerArgs)=>{
                if(err){
                    return reject(err);
                }
                return resolve(...innerArgs);
            });
        });
    };
};