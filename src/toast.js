import remove from 'lodash/remove';
import findIndex from 'lodash/findIndex';
export const generateToast=({
    show,
    hide,
    update
}={})=>{
    let showCount=1;
    let toasts=[];
    let currentId=0;

    const getUpdateArgs=()=>{
        const {args,id}=toasts[toasts.length-1];
        if(currentId==id){
            return null;
        }
        const _mask=findIndex(toasts,item=>item.mask)>-1;
        const opt={
            ...args,
            mask:_mask,
            duration:24*60*60*1000//忽略自动关闭功能
        };
        currentId=id;
        return opt;
    };

    const _hide=function(id){
        remove(toasts,item=>item.id==id);
        if(toasts.length>0){
            const args=getUpdateArgs();
            if(!args){
                return;
            }
            update(args);
            return;
        }
        hide();
    };

    const _show = function(args={}){
        const id=showCount++;
        const {duration=0,mask,..._args}=args;
        toasts.push({
            id,
            args:_args,
            duration,
            mask:!!mask
        });

        setTimeout(function(){
            _hide(id);
        },duration);

        const opt=getUpdateArgs();
        if(toasts.length==1){
            show(opt);
        }else{
            update(opt);
        }
        return {
            id,
            hide(){
                _hide(id);
            }
        }
    };

    const hideAll=function(){
        toasts=[];
        hide();
    };
    return {
        show:_show,
        hide:_hide,
        hideAll
    }
};
export default generateToast;