export const asyncWrap=fn=>(req,res,next)=>{
    fn(req,res,next)
        .catch(next);
};
export const getAsyncGet=(app)=>(path,fn)=>{
    app.get(path,asyncWrap(fn));
};
export const asyncPost=(app)=>(path,fn)=>{
    app.post(path,asyncWrap(fn));
};