/**
 * Created by kule on 2017/7/21.
 */
export const Deferred=function(){
    let _resolve,_reject;
    const deferred=new Promise((resolve,reject)=>{
        _resolve=resolve;
        _reject=reject;
    });
    deferred.resolve=_resolve;
    deferred.reject=_reject;
    _resolve=null;
    _reject=null;
    return deferred;
};
export default Deferred;