const {countdown}=require('../lib/countdown');

const {start,pause,resume,stop}=countdown(3*60*60*1000,({hour,minute,second})=>{
    console.log(`${hour}:${minute}:${second}`);
},{isPad:true});
start();
setTimeout(()=>{
    pause();
},5000);
setTimeout(()=>{
    resume();
},10000);
setTimeout(()=>{
    stop();
},2*10000);