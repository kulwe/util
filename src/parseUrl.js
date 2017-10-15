/**
 * Created by kule on 2017/7/20.
 */
import tail from 'lodash/tail';
const splitToTail=(str,splitMark)=>{
    const arr=str.split(splitMark);
    return [arr[0],tail(arr).join('')];
};
import {parseSearch} from './parseSearch';

//可以不含protocol http:// 或 /a/b?c=
//http://zhen22.com:33/aa?t=1#/bb/?m=2
const regProtocol=/^([^:]+):\/\/(.+)$/;
const regHost=/^([^:\/]+)(?::(\d+)?)?($|\/$|\/.+$)/;
const regRootPath=/^\/(.*)/;
export const parseUrl=(url='')=>{
    let [remainUrl,search]=splitToTail(url,'?');
    const rst={
        protocol:'',
        host:'',
        port:'',
        pathname:'',
        query:parseSearch(search)
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
        rst.port=hostMatch[1];
        rst.pathname=hostMatch[1];
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