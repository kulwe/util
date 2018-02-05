const {uniqPush}=require('../lib/uniqPush');

var y={a:1};
var x=[
    1,2,3,y
];

console.log(x);
uniqPush(x,4);
console.log(x);
uniqPush(x,y);
uniqPush(x,3);
console.log(x);