/**
 * Created by wly on 2017/5/10.
 */
import moment from 'moment';
const timeAgo = (data, year)=> {
    if (!data) {
        return data;
    }
    if (!year && data.toString().length === 10) {
        data = (data - 0) * 1000;
    } else if (year) {
        data = data.toString();
    }
    const now = new Date().getTime();
    const time = new Date(data).getTime();
    const span = (now - time) / 1000;
    let text = '';
    if(span<60){
        text='刚刚';
    }else if(span<3600){
        text = parseInt(span/60)+"分钟前"
    }else if(span<24*3600){
        text = parseInt(span/3600)+"小时前"
    }else if(span<31*24*3600){
        text = parseInt(span/(24*3600))+"天前"
    }else if(span<365*24*3600){
        text = parseInt(span/(31*24*3600))+"月前"
    }else{
        text = parseInt(span/(365*24*3600))+"年前"
    }
    return text;
};
export default timeAgo;