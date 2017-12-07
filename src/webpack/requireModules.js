/*
/!**
 * Created by kule on 2017/2/14.
 *!/
import isFunction from 'lodash/isFunction';
import filter from 'lodash/filter';
import map from 'lodash/isFunction';
import reduce from 'lodash/reduce';
import {getBaseName} from '../getBaseName';

export const getContextFiles=function(requireContext,filter){
    let files=requireContext.keys();
    if(isFunction(filter)){
        files=filter(files,filter);
    }
    return files;
};
export const getContextFiles=function(
    _context,dir,
    {
        hasSub=true,
        filter=/\bindex\.js$/
    }={}
){
    if(isFunction(filter)){
        files=filter(files,filter);
    }
    let files=_context(dir,hasSub,filter).keys();
    if(isFunction(filter)){
        files=filter(files,filter);
    }
    return files;
};

/!**
 *
 * @param requireContext require.context('pages/',true,/\'b/)
 * @param filter
 * @returns {boolean}
 *!/
export const requireAll=function(requireContext,filter){
    const files=getContextFiles(requireContext,filter);
    return map(files,requireContext);
};

const regModuleName=/\/([^\/]+)\/index\.js/;
const getModuleName=(file)=>{
    const name=file.match(regModuleName);
    if(!name){
        return getBaseName(file);
    }
    return name[1];
};
export const requireModules=function(requireContext,{filter,onlyDefault}={}){
    const files=getContextFiles(requireContext,filter);
    return reduce(files,(rst,file)=>{
        const name=getModuleName(file);
        const module=requireContext(file);
        rst[name]=onlyDefault?module.default:module;
        return rst;
    },{});
};

export const requireModulesLazy=function(modules,loader,{onlyDefault}={}){
    const keys=[];
    const tasks=reduce(modules,(rst,module,key)=>{
        const task=new Promise((resolve)=>{
            loader(module)((exp)=>{
                resolve(exp);
            });
        });
        keys.push(key);
        rst.push(task);
        return rst;
    },[]);
    return Promise
        .all(tasks)
        .then(function(exps){
            return reduce(exps,(rst,exp,index)=>{
                rst[keys[index]]=onlyDefault?exp.default:exp;
                return rst;
            },{});
        });
};

*/
