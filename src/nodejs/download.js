import https from 'https';
import http from 'http';
import fs from 'fs';

export const createGetHttpAgent=({
    isHttp=false
}={})=>{
    let downloadAgent=null;
    return ()=>{
        if(downloadAgent){
            return downloadAgent
        }
        const _http=isHttp?http:https;
        return downloadAgent=new _http.Agent({
            keepAlive:true,
            maxSockets:100,    //限制并发数防止cdn关闭下载
            maxFreeSockets:100
        });
    };
};

const getHttpAgent=createGetHttpAgent({
    isHttp:true
});
const getHttpsAgent=createGetHttpAgent();

export const download = (url,filePath,config={}) => {
    const {
        isHttp=false
    }=config;

    return new Promise((resolve, reject) => {
        const urlConfig=Url.parse(url);
        const _http=isHttp?http:https;
        const agent=isHttp?getHttpAgent():getHttpsAgent();
        _http.get({
            ...urlConfig,
            agent
        }, (res) => {
            if (res.statusCode !== 200) {
                reject(res);
                res.resume();
                return;
            }
            res.pipe(fs.createWriteStream(filePath))
                .on('finish', resolve)
                .on('error', reject);
        });
    });
};
export default download;