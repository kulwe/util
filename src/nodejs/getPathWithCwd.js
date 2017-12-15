import Path from 'path';

const _cwd = process.cwd();
export const getPathWidthCwd = (...args) => {
    return Path.join(_cwd, ...args);
};
export const getPathFn = (...args) =>(...args2)=>{
    return Path.join(...args,...args2);
};
export const getPathFnWithCwd = (...args) =>(...args2)=>{
    return Path.join(_cwd,...args,...args2);
};
export default getPathWidthCwd;