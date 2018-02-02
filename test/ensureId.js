const {ensureId}=require('../lib/ensureId');

const map=[
    {a:1},
    {b:2},
    {a:1},
];
const values=ensureId(map);
const values2=ensureId(map);

console.log(values);
console.log(values2);