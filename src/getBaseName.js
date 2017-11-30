/**
 * Created by kule on 2017/11/30.
 */
const regBaseName=/[^/\\]+$/;
const regExtName=/(.)(\.[^.]+)?$/;
export const getBaseName=function(file,hasExt){
    const name=file.match(regBaseName);
    if(!name)return name;
    if(hasExt){
        return name[0];
    }
    return name[0].replace(regExtName,'$1');
};
export default getBaseName;