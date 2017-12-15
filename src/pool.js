/*
const genPoolRun=({
    poolSize=20
}={})=>async (promiseFn,getArgs)=>{
    let current=0;
    let pool=0;
    const endFlag={};
    const isEnd=(flag)=>{
        return flag===endFlag;
    };
    const check=(err)=>{
        if(poolSize){
            releasePool();
        }
        current++;
        console.log(`当前处理：${current}/${count}`);
        if(err){
            console.log('本次处理错误',err);
        }
        if(current>=count){
            defer.resolve();
        }
    };
    const done=()=>{
        check();
    };

    let args=await getArgs(current,endFlag);
    while(!isEnd(args)){
        await promiseFn(args);
        args=await getArgs(current,endFlag)
    }

    let deferPool=null;
    const checkAndAddPool=()=>{
        if(pool<poolSize){
            pool++;
            console.log('checkAndAddPool:'+pool);
            promiseFn(...args)
                .then(done)
                .catch(check);
        }
        console.log('checkAndAddPool:'+pool);
        if(deferPool){
            console.log('deferPool');
            return deferPool;
        }
        if(pool>=poolSize){
            console.log('createDefer');
            deferPool=Deferred();
            return deferPool;
        }
        console.log('pool free');
    };
    const releasePool=()=>{
        pool--;
        console.log('releasePool:'+pool);
        if(pool<poolSize&&deferPool){
            deferPool.resolve();
            deferPool=null;
        }
    };

    const start=()=>{
        let args;
        while(checkAndAddPool()){
            checkAndAddPool()
        }
    };
    return checkAndAddPool
    return defer;
};*/
