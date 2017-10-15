/**
 * Created by kule on 2017/7/25.
 */
class _Error extends Error{
    constructor(...args){
        super(args);
        this.name='Promise Reject Error';
    }
}
export const PromiseError=(err)=>{
    let newErr=err;
    if(!err||typeof newErr =='string'){
        newErr=new _Error(newErr);
    }
    return newErr;
};
export default PromiseError;