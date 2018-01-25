import padStart from 'lodash/padStart';
export const countdown=(count,fn,{
    isPad=false
}={})=>{
    let end=(new Date).getTime()+count;
    const hourTime=60*60*1000;
    const minuteTime=60*1000;
    const secondTime=1000;
    const down=()=>{
        const now=(new Date).getTime();
        const _count=end-now;
        let retain=_count;

        const hour=Math.floor(_count/hourTime);
        retain-=hour*hourTime;
        const minute=Math.floor(retain/minuteTime);
        retain-=minute*minuteTime;
        const second=Math.floor(retain/secondTime);
        let rst;
        if(padStart){
            rst={
                count:_count,
                hour:padStart(hour,2,'0'),
                minute:padStart(minute,2,'0'),
                second:padStart(second,2,'0')
            }
        }else{
            rst={
                count:_count,
                hour,
                minute,
                second
            };
        }
        fn(rst);
        if(now<end){
            setTimeout(down,1000);
        }
    };
    return down;
};
export default countdown;