/**
 * Created by kule on 2017/8/1.
 */
export const createLoading=(requestEvent,onShowMessage)=>{
    let loadingCount=0;
    let _closeLoading=null;
    let timeHandler=null;
    const closeLoading=()=>{
        _closeLoading&&_closeLoading();
        _closeLoading=null;
    };
    const addLoading=()=>{
        if(loadingCount<=0){
            _closeLoading=onShowMessage();
        }
        loadingCount++;
        clearTimeout(timeHandler);
        timeHandler=setTimeout(closeLoading,30*1000);
    };
    const subtractLoading=()=>{
        loadingCount--;
        if(loadingCount<=0){
            loadingCount=0;
            closeLoading();
        }
    };

    requestEvent.on('RequestSend',()=>{
        addLoading();
    });
    requestEvent.on('RequestError',()=>{
        subtractLoading();
    });
    requestEvent.on('RequestSuccess',()=>{
        subtractLoading();
    });
};
export default createLoading;