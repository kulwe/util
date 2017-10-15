/**
 * Created by wly on 2017/5/10.
 */
import moment from 'moment';
const totalTime=(data,minUnit,startUnit)=>{
    if(!data||!parseInt(data)){
        return data;
    }
    const duration=moment.duration(data,'ms');
    let isValid=startUnit?false:true;
    const times=[
        {
            key: 'year',
            unit:'年',
            value: duration.get('y')
        },
        {
            key: 'month',
            unit:'个月',
            value: duration.get('M')
        },
        {
            key: 'day',
            unit:'天',
            value: duration.get('d')
        },
        {
            key: 'hour',
            unit:'时',
            value: duration.get('h')
        },
        {
            key: 'minute',
            unit:'分',
            value: duration.get('m')
        },
        {
            key: 'second',
            unit:'秒',
            value: duration.get('s')
        }
    ];
    let text=[];
    _.forEach(times,function(item){
        if(item.key == startUnit){
            isValid = true;
            item.value = parseInt(duration.as(startUnit));
        }
        if(isValid&&item.value){
            text.push([item.value,item.unit].join(''));
        }
        if(item.key == minUnit){
            isValid = false
        }
    })
    return text.join('');

};
export default totalTime;