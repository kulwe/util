import final from './final';
export const promisePool=({
    size=5
}={})=>{
    let id=1;
    const willPools=[];
    const doPools=[];

    const addPool=(fn)=>{
        if(doPools.length>=size){
            willPools.push(fn);
            return;
        }
        return _addPool(fn);
    };
    const _addPool=(fn)=>{
        let _id=id++;
        doPools.push(_id);
        final(fn(),()=>{
            const index=doPools.indexOf(_id);
            if(index<-1){
                return;
            }
            doPools.splice(index,1);
            runWillPool();
        });
        return _id;
    };
    const runWillPool=()=>{
        if(doPools.length>=size){
            return;
        }
        const fn=willPools.shift();
        if(!fn){
            return;
        }
        addPool(fn);
    };

    return addPool;
};
export default promisePool;