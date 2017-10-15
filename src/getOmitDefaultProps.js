/**
 * Created by kule on 2017/6/5.
 */
import _ from 'lodash';
const getOmitDefaultProps=(defaultProps,reactInstance,ReactClass)=>{
    return {
        ...defaultProps,
        ..._.omit(reactInstance.props,_.keys(ReactClass.defaultProps)),
    }
};
export default getOmitDefaultProps;