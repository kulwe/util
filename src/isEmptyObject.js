/**
 * Created by wly on 2017/5/10.
 */
const isEmptyObject=(object)=>{
    var t;
    for(t in object)
        return !1;
    return !0
};
export default isEmptyObject;