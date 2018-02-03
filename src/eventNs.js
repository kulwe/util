import castArray from 'lodash/castArray';
const getArgs=(args)=>{
    let [eventName,ns,fn]=args;
    if(typeof ns=='function'){
        fn=ns;
        ns='';
    }
    return {
        eventName,
        fn,
        ns
    }
};

export const addEventNs=(event,{
    addListener='addListener',
    removeListener='removeListener',
    removeListeners='removeListeners'
}={})=>{
    const fnsWithNs={
/*        'ns':{
            'eventName':[]
        }*/
    };

    const getFns=(ns,eventName)=>{
        let fns=fnsWithNs[ns]||(fnsWithNs[ns]={});
        if(!eventName){
            return fns;
        }
        let _fns=fns[eventName]||(fnsWithNs[ns][eventName]=[]);
        return _fns;
    };
    const removeFn=(ns,eventName,fn)=>{
        const fns=getFns(ns,eventName);
        if(!eventName){
            fnsWithNs[ns]={};
            return;
        }
        if(!fn){
            fnsWithNs[ns][eventName]=[];
            return;
        }
        const index=fns.indexOf(fn);
        if(index<0){
            return;
        }
        fns.splice(index,1);
    };

    event.on=function(...args){
        const {eventName,fn,ns}=getArgs(args);
        if(ns&&eventName&&fn){
            let fns=getFns(ns,eventName);
            fns.push(fn);
        }
        return event[addListener](eventName,fn);
    };

    const offNs=(ns,eventName,fn)=>{
        if(ns&&eventName&&fn){
            removeFn(ns,eventName,fn);
            return event[removeListener](eventName,fn);
        }
        if(ns&&eventName){
            let fns=getFns(ns,eventName);
            removeFn(ns,eventName);
            return event[removeListeners](eventName,fns);
        }
        if(ns){
            let fns=getFns(ns);
            removeFn(ns);
            for(let key in fns){
                event[removeListeners](key,fns[key]);
            }
            return event;
        }
    };
    event.off=function(...args){
        const {eventName,fn,ns}=getArgs(args);
        if(ns){
            return offNs(ns,eventName,fn);
        }
        return this[removeListener](eventName,fn);
    };

    event.getNsListeners=getFns;
    return event;
};

export const addOnOneEvent=(event)=>{
    event._on=event.on;
    event.on=function(eventNames,ns,fn){
        const names=castArray(eventNames);
        for(let i=0;i<names.length;i++){
            this._on(names[i],ns,fn);
        }
        return this;
    };
    event._off=event.off;
    event.off=function(eventNames,ns,fn){
        const names=castArray(eventNames);
        for(let i=0;i<names.length;i++){
            this._off(names[i],ns,fn);
        }
        return this;
    };

    event.onOne=function(eventNames,ns,fn){
        this.off(eventNames,ns);
        this.on(eventNames,ns,fn);
        return this;
    };
};

export default addEventNs;