const {getEnumText}=require('../lib/getEnumText');

const payState={
    noPay:{
        value:0,
        text:'未支付'
    },
    payed:{
        value:1,
        text:'已支付'
    },
    fail:{
        value:2,
        text:'支付失败'
    },
    orderClose:{
        value:3,
        text:'订单关闭'
    }
};
const payStateText=getEnumText(payState);

console.log(payStateText[payState.orderClose.value]);