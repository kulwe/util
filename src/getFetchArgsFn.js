import defaultsDeep from 'lodash/defaultsDeep';
import setQuery from './setQuery';
import setSearchParams from './setSearchParams';

export const getFetchArgsFn = function ({
    getHeader = () => ({}),
    getDefUrlParams = () => ({}),
    getDefBody = () => ({}),
    ..._def
}={}){
    return function (param = {}) {
        const {url,method,type='json',..._option} = param;
        const isGet=method==='GET';

        const option = {
            ..._def,
            ..._option
        };
        let isBodyJson=(!isGet&&type==='json');
        let isBodyUrl=(!isGet&&type==='url');
        const defBody=getDefBody();
        if(isBodyJson){
            option.headers['Content-Type']='application/json';
            option.body=JSON.stringify(defaultsDeep({},option.body,defBody));
        }
        if(isBodyUrl){
            // option.headers['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8';
            // option.body=setSearchParams(option.body)+'';
            option.body=setSearchParams(defaultsDeep({},option.body,defBody));
        }
        if(isGet){
            option.body=defaultsDeep({},option.body,defBody);
        }
        const urlParam = Object.assign({}, getDefUrlParams(),isGet?option.body:{});
        if(isGet){
            delete option.body;
        }

        //默认method为get
        option.method = method ? method.toUpperCase() : 'GET';
        //添加所有需要的Header
        option.headers = defaultsDeep({}, getHeader(), option.headers);
        //支持跨域
        option.mode = 'cors';
        //支持cookie
        // option.credentials = 'include';
        return {
            url:setQuery(url,urlParam),
            option
        }
    };
};
export default getFetchArgsFn;