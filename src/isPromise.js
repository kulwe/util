/**
 * Created by kule on 2017/5/22.
 */
export const isPromise = function (promise = {}) {
    return (promise instanceof Promise) ||
        (promise.then && promise.catch);
};

export default isPromise;