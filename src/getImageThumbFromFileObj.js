/**
 * Created by kule on 2017/5/13.
 */

const getImageThumbFromFileObj=(fileObj)=>{
    return URL.createObjectURL(fileObj)
};

export default getImageThumbFromFileObj;