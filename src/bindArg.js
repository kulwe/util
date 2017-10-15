/**
 * Created by kule on 2017/5/18.
 */
import noop from './noop';
const bindArg=function(fn=noop,...bindArgs){
    return function(...args){
        fn(...bindArgs,...args);
    }
};
export default bindArg;