/**
 * Created by kule on 2017/7/3.
 */
import _ from 'lodash';
export const flatObj=function(data,key='',result={}){
    let item;
    let deepKey;
    for(let k in data){
        item=data[k];
        deepKey=key?`${key}.${k}`:k;
        if(_.isPlainObject(item)||_.isArray(item)){
            flatObj(item,deepKey,result);
        }else{
            result[deepKey]=item;
        }
    }
    return result;
};
export const flatObjAndIgnoreArray=function(data,key='',result={}){
    let item;
    let deepKey;
    for(let k in data){
        item=data[k];
        deepKey=key?`${key}.${k}`:k;
        if(_.isPlainObject(item)){
            flatObjAndIgnoreArray(item,deepKey,result);
        }else{
            result[deepKey]=item;
        }
    }
    return result;
};