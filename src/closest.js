/**
 * Created by kule on 2017/5/17.
 */

const closest=(dom,className)=>{
    let pDom=dom;
    const reg=new RegExp(`\\b${className}\\b`);
    while(pDom){
        if(reg.test(pDom.className)){
            return pDom;
        }
        pDom=pDom.parentElement;
    }
};

export default closest;