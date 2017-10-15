/**
 * Created by kule on 2017/8/14.
 */
const regs=[/(mac\sos\sx)\s?([\w\s\.]+\w)*/i,
    /(macintosh|mac(?=_powerpc)\s)/i];
export const isMac=(userAgent='')=>{
    let reg;
    for(let i=0,il=regs.length;i<il;i++){
        reg=regs[i];
        if(reg.test(userAgent)){
            return true;
        }
    }
    return false;
};