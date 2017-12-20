/**
 * Created by kule on 2017/10/26.
 */
import http from 'http';
import https from 'https';
import Url from 'url';
import pick from 'lodash/pick';
import {unGzipRes} from './unGzip';

export const getDefaultHeaders=(headers={})=>{
    return {
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding':'gzip',
        'Accept-Language':'zh-CN,zh;q=0.8',
        'Connection':'keep-alive',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
        ...headers
    }
};
export const requestWithProxy=({
    url,
    headers={},
    method='get',
    body,
    proxy={},
    ...other
}={})=>{
    const urlObj=Url.parse(url);
    const options={
        method:method.toUpperCase(),
        protocol:'http:',
        host:proxy.host||'127.0.0.1',
        path:Url.format(url),
        port:proxy.port||8888,
        headers:getDefaultHeaders({
            Host:Url.format(pick(urlObj,['hostname','port'])),
            ...headers
        }),
        body,
        ...other
    };
    return requestWithOptions(options);
};
export const request=(options={})=>{
    if(options.proxy){
        return requestWithProxy(options);
    }
    return requestNoProxy(options);
};
export const requestNoProxy=({
    url,
    headers={},
    method='get',
    body,
    ...other
}={})=>{
    const urlObj=Url.parse(url);
    const options={
        method:method.toUpperCase(),
        ...pick(urlObj,['protocol','host','path','port']),
        headers:getDefaultHeaders(headers),
        body,
        ...other
    };
    return requestWithOptions(options);
};
export const requestWithOptions=({
    body,
    ...options
}={})=>{
    return new Promise((resolve,reject)=>{
        const _http=options.protocol=='https:'?https:http;
        if(body){
            options.headers={
                'Content-Type':'application/json;charset=UTF-8',
                'Content-Length':Buffer.byteLength(body),
                ...(options.headers||{})
            }
        }
        const request=_http.request(options);
        request.on('response',(res)=>{
            const {statusCode}=res;
            if(statusCode!==200){
                let err=`error:${statusCode}`;
                res.resume();
                reject(err);
                return;
            }
            unGzipRes(res,(err,result)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve(result.toString());
            });
            res.on('error',reject);
        });
        body&&request.write(body);
        request.end();
    });
};
export default request;