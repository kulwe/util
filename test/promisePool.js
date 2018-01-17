const {promisePool}=require('../lib/promisePool');
const {promiseDelay}=require('../lib/promiseDelay');

const poolRun=promisePool();

const genPromise=()=>{
    for(let i=0;i<20;i++){
        console.log(i);
        ((i)=>{
            poolRun(()=>{
                console.log('call: '+i);
                return promiseDelay(Math.random()*5000).then(()=>{
                    console.log('done: '+i);
                });
            });
        })(i);
    }
};
genPromise();