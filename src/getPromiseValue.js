/**
 * Created by liukai on 2017/7/18.
 */
export default function (value,config = {reject:false}) {
    return (value instanceof Promise) ||
    (value.then && value.catch) ?
        value :
        config.reject?Promise.reject(value):Promise.resolve(value);
};

