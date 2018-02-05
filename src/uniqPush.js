export const uniqPush=(arr=[],...args)=>{
    const items=[];
    for(let i=0,il=args.length;i<il;i++){
        let item=args[i];
        if(arr.indexOf(item)>-1){
            continue;
        }
        items.push(item);
    }
    return arr.push(...items);
};
export default uniqPush;