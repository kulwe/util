/**
 * Created by kule on 2017/10/30.
 */
import zlib from 'zlib';
export const unGzipRes=(res,cb)=>{
    let rawData=[];
    const encoding=res.headers['content-encoding'];
    res.on('data',chunk=>rawData.push(chunk));
    res.on('end',()=>{
        const rst = Buffer.concat(rawData);
        unGzip(encoding,rst)
            .then((data)=>{
                cb(null,data)
            })
            .catch(cb);
    });
};
export const unGzip=(encoding,data)=>{
    return new Promise((resolve,reject)=>{
        const cb=(err,buffer)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(buffer);
        };
        if(encoding==='gzip'){
            zlib.gunzip(data,cb);
            return;
        }
        if(encoding==='deflate'){
            zlib.deflate(data,cb);
            return;
        }
        cb(null,data);
    });
};
export default unGzip;