import defaultsDeep from 'lodash/defaultsDeep';
import setQuery from './setQuery';
export const  fetchOptionFn= function ({getHeader = () => ({}), getDefUrlParams = () => ({}), ..._def}) {
    return function (param = {}) {
        const {url, method, data={}, ..._config} = param;
        const urlParam=Object.assign({},getDefUrlParams(),data);
        const _url=setQuery(url,urlParam);

        const config = {
            ..._def,
            ..._config
        };
        //默认method为get
        config.method = method ? method.toUpperCase() : 'GET';
        //添加所有需要的Header
        config.headers = defaultsDeep({},getHeader(),config.headers);
        //支持跨域
        config.mode = 'cors';
        //支持cookie
        config.credentials = 'include';
        return config;
    };
};