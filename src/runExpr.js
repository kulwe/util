/**
 * Created by kule on 2017/7/5.
 */
export const runExpr=function(expr,_args={}){
    if(!expr){
        return !!expr;
    }
    if(_.isBoolean(expr)){
        return expr;
    }
    let body;
    if(_.isString(expr)){
        expr={
            expr:expr
        };
    }
    if(_.isPlainObject(expr)){
        const {fn,args}=expr;
        if(fn){
            body=`const fn=(${fn});return fn(args)`;
        }else if(expr.expr){
            body=`const rst=(${expr.expr});return rst`;
        }
        _args=Object.assign({},_args,args);
    }
    const fn=new Function('args',body);
    return fn(_args);
};
export default runExpr;