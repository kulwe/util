const {getPromiseMap}=require('../lib/getPromiseMap');

const mock=getPromiseMap({
    list(){
        return [
            {
                "id": 2,
                "name": "北京四中特级教师：有机化学知识要点串讲",
                "single_price": 499,
                "group_price": 299,
                "grade": "高一",
                "subject": "数学",
                "min_person": "2",
                "cover": "/assets/img/demo.jpg"
            }
        ]
    },
    detail(){
        return {
            a:1
        }
    },
    search:[
        {b:1}
    ]
});

mock.list().then(console.log);
mock.detail().then(console.log);
mock.search().then(console.log);