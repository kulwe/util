import get from 'lodash/get';
export const getAppStore=(keyPath,key='app')=>{
    let store=localStorage[key];
    if(!store){
        return {};
    }
    try{
        store=JSON.parse(store);
        return keyPath?get(store,keyPath):store;
    }catch(ex){
        return {};
    }
};
export const setAppStore=(obj,key='app')=>{
    const storage=getAppStore('',key);
    Object.assign(storage,obj);
    localStorage[key]=JSON.stringify(storage);
};
export const resetAppStore=(obj,key='app')=>{
    localStorage[key]=JSON.stringify(obj);
};

export const createStore=(key)=>{
    return {
        get:(keyPath)=>getAppStore(keyPath,key),
        set:(obj)=>setAppStore(obj,key),
        reset:(obj)=>resetAppStore(obj,key)
    }
};