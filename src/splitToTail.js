import tail from 'lodash/tail';
export const splitToTail=(str,splitMark)=>{
    const arr=str.split(splitMark);
    return [arr[0],tail(arr).join('')];
};
export default splitToTail;