export const final=(promise,fn)=>{
    promise.then((res)=>{
        fn(res);
    });
    promise.catch((err)=>{
        fn(err);
        return Promise.reject(err);
    })
};
export default final;