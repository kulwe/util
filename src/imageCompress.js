/**
 * Created by kule on 2017/9/12.
 */
import ImageCompressor from 'image-compressor';
import _ from 'lodash';
export const imageCompress=(file,options)=>{
    const _options=_.defaultsDeep(options,{
        limitSize:4*1000*1000
    });
    if(file.size<_options.limitSize){
        return Promise.resolve(file);
    }
    return compress(file,_options);
};

const getMaxAttrAndScale=({width,height},scale=0.5)=>{
    if(width>height){
        return {
            width:width*scale
        }
    }
    return {
        height:height*scale
    }
};
const compress=(file,options,tryCount=0)=>{
    if(tryCount>2){
        return Promise.resolve(file);
    }
    return _compress(file,options)
        .then((result)=>{
            const minImage=result.file||{};
            if(minImage.size<options.limitSize){
                return minImage;
            }
            tryCount++;
            return compress(file,{
                ...options,
                ...getMaxAttrAndScale(result.imageAttr)
            },tryCount);
        });
};
const _compress=(file,options)=>{
    const _image=new ImageCompressor();
    return _image.compress(file,options);
};

export default imageCompress;