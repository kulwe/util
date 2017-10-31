/**
 * Created by kule on 2017/7/20.
 */
import {splitToTail} from "./splitToTail"
import {parseSearch} from './parseSearch';

//可以不含protocol http:// 或 /a/b?c=
//http://zhen22.com:33/aa?t=1#/bb/?m=2
const regProtocol=/^([^:]+):\/\/(.+)$/;
const regHost=/^([^:\/]+)(?::(\d+)?)?($|\/$|\/.+$)/;
const regRootPath=/^\/(.*)/;
const _parseUrl=(url='')=>{
    let [_url,hash]=splitToTail(url,'#');
    let [remainUrl,search]=splitToTail(_url,'?');
    const rst={
        protocol:'',
        host:'',
        port:'',
        pathname:'',
        query:parseSearch(search),
        hash
    };
    const protocolMatch=remainUrl.match(regProtocol);
    if(protocolMatch){
        rst.protocol=protocolMatch[1];
        remainUrl=protocolMatch[2];
    }else{
        rst.pathname=remainUrl;
        return rst;
    }
    const rootPathMatch=remainUrl.match(regRootPath);
    //发现/开头的路径，不再尝试解析host和port直接返回
    if(rootPathMatch){
        rst.pathname=rootPathMatch[1];
        return rst;
    }
    const hostMatch=remainUrl.match(regHost);
    if(hostMatch){
        rst.host=hostMatch[1];
        rst.port=hostMatch[2];
        rst.pathname=hostMatch[3];
    }
    return rst;
};
export const parseUrl=(url)=>{
    return ensureEmpty(_parseUrl(url));
};
const ensureEmpty=(rst)=>{
    for(let key in rst){
        if(!rst[key]){
            rst[key]='';
        }
    }
    return rst;
};

export const parseUrlWithHash=(_url='')=>{
    const [url,hashUrl]=splitToTail(_url,'#');
    return {
        url:parseUrl(url),
        hash:parseUrl(hashUrl)
    }
};

export const parseHash=(_url='')=>{
    const [url,hashUrl]=splitToTail(_url,'#');
    return parseUrl(hashUrl);
};
export const toUrl=(urlObj={})=>{
    let {protocol,host,port,pathname,query,hash}=urlObj;
    query=queryToString(query);
    return `${protocol||''}://${host||''}${port?(':'+port):''}${pathname||'/'}?${query||''}#${hash||''}`;
};

export const queryToString=(query)=>{
    const rst=[];
    let val='';
    for(let key in query) {
        val = query[key];
        rst.push(key + (val ? `=${val}` : ''))
    }
    return rst.join('&');
};
export const modifyUrl=(url,modify=(urlObj)=>urlObj)=>{
    return toUrl(modify(parseUrl(url)));
};