const {pluckWithIds}=require('../lib/pluckWithIds');

const map={
    'a':'valueA',
    'b':'valueB',
    'c':'valueC',
};
const values=pluckWithIds(map,'b,c');

console.log(values.join(':'));