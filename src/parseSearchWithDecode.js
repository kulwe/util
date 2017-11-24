/**
 * Created by kule on 2017/7/21.
 */
import _parseSearch from './parseSearch';
import he from 'he';
export const parseSearch=(search='',...args)=>{
    return _parseSearch(he.decode(search),...args);
};
export default parseSearch;