import padStart from 'lodash/padStart';

export const countdown = (count, fn, {
    isPad = false
} = {}) => {
    let end = (new Date).getTime() + count;
    const hourTime = 60 * 60 * 1000;
    const minuteTime = 60 * 1000;
    const secondTime = 1000;

    let isPause = false;
    let timeHandler;

    const getCount = () => {
        const now = (new Date).getTime();
        const _count = end - now;
        let retain = _count;

        const hour = Math.floor(_count / hourTime);
        retain -= hour * hourTime;
        const minute = Math.floor(retain / minuteTime);
        retain -= minute * minuteTime;
        const second = Math.floor(retain / secondTime);
        if (isPad) {
            return {
                count: _count,
                hour: padStart(hour, 2, '0'),
                minute: padStart(minute, 2, '0'),
                second: padStart(second, 2, '0')
            }
        }
        return {
            count: _count,
            hour,
            minute,
            second
        }
    };

    const down = () => {
        if (isPause) {
            return;
        }
        const now=(new Date).getTime();
        if (now > end) {
            return;
        }
        const count = getCount();
        fn(count);
        timeHandler=setTimeout(down, 1000);
    };

    const pause=()=>{
        isPause=true;
        clearTimeout(timeHandler);
    };
    const resume=()=>{
        isPause=false;
        down();
    };
    return {
        start:down,
        stop:pause,
        pause,
        resume
    }
};
export default countdown;