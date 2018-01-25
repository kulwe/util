const {countdown}=require('../lib/countdown');

const start=countdown(3*60*60*1000,({hour,minute,second})=>{
    console.log(`${hour}:${minute}:${second}`);
},{isPad:true});
start();