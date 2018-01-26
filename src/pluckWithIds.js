export const pluckWithIds = function (map = [], ids = '') {
    const _ids = ids.split(',');
    const rst=[];
    let id;
    for(let i=0,il=_ids.length;i<il;i++){
        id=_ids[i];
        if (id && id in map) {
            rst.push(map[id]);
        }
    }
    return rst;
};
export default pluckWithIds;
