/**
 * Created by kule on 2017/10/26.
 */
import http from 'http';
import Url from 'url';
import pick from 'lodash/pick';
import {unGzipRes} from './unGzip';

export const requestWithProxy=({
    url,
    headers={},
    method='get',
    body,
    proxy={}
}={})=>{
    return new Promise((resolve,reject)=>{
        const urlObj=Url.parse(url);
        if(body){
            headers['Content-Type']='application/json;charset=UTF-8';
            headers['Content-Length']=Buffer.byteLength(body);
        }
        const request=http.request({
            method:method.toUpperCase(),
            path:Url.format(url),
            headers:{
                'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Encoding':'gzip',
                'Accept-Language':'zh-CN,zh;q=0.8',
                'Connection':'keep-alive',
                'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
                Host:Url.format(pick(urlObj,['hostname','port'])),
                ...headers
            },
            protocol:'http:',
            host:proxy.host||'127.0.0.1',
            port:proxy.port||8888
        });
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
export default requestWithProxy;