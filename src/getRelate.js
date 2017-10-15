/**
 * Created by kule on 2017/6/14.
 */
export const getRelateTop=(dom,relateDom=null)=>{
    let top=0;
    while(dom&&dom!==relateDom){
        top+=dom.offsetTop;
        dom=dom.offsetParent;
    }
    return top;
};

export const getRelateWindowHeight=(dom)=>{
    const top=getRelateTop(dom);
    return window.innerHeight-top;
};