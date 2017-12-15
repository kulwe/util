/**
 * Created by kule on 2017/10/25.
 */
import {MongoClient}from 'mongodb';
import {Deferred}from '../Deferred';
import get from 'lodash/get';

export const eachSeriesWithDb=async function({
    db,
    collection,
    ...args
}){
    const col= await getCollection({
        db,
        collection
    });
    await eachSeries({
        collection:col,
        ...args
    });
    return col._db;
};

const eachPrepare=async ({
    collection,
    cursor
})=>{
    let _cursor=await cursor(collection)
        .addCursorFlag('noCursorTimeout',true)
        .snapshot(true);
    const count=await _cursor.count(true);
    return {
        _cursor,
        count
    }
};


export const eachSeriesAggregate=async function({
    collection,
    aggregate,
    each
}){
    const _count=await collection.aggregate([
        ...aggregate,
        {
            $count:'total'
        }
    ]).toArray();
    const count=get(_count,'0.total');
    const _cursor=await collection.aggregate([
        ...aggregate,
    ]);

    let current=0;
    console.log(`本次处理总数据：${count}条`);
    while (await _cursor.hasNext()){
        await each(await _cursor.next());
        current++;
        console.log(`当前处理：${current}/${count}`);
    }
    return await _cursor.close();
};


export const eachSeries=async function({
    collection,
    cursor,
    each
}){
    const {_cursor,count}=await eachPrepare({
        collection,
        cursor
    });
    let current=0;
    console.log(`本次处理总数据：${count}条`);
    while (await _cursor.hasNext()){
        await each(await _cursor.next());
        current++;
        console.log(`当前处理：${current}/${count}`);
    }
    return await _cursor.close();
};

export const eachParallel=async function({
    collection,
    cursor,
    each,
    poolSize=100
}){
    const {_cursor,count}=await eachPrepare({
        collection,
        cursor
    });
    let current=0;
    let pool=0;
    console.log(`本次处理总数据：${count}条`);
    const defer=Deferred();
    const check=(err)=>{
        if(poolSize){
            releasePool();
        }
        current++;
        console.log(`当前处理：${current}/${count}`);
        if(err){
            console.log('本次处理错误',err);
        }
        if(current>=count){
            defer.resolve();
        }
    };
    const done=()=>{
        check();
    };

    let deferPool=null;
    const checkAndAddPool=(count=1)=>{
        pool+=count;
        console.log('checkAndAddPool:'+pool);
        if(deferPool){
            console.log('deferPool');
            return deferPool;
        }
        if(pool>=poolSize){
            console.log('createDefer');
            deferPool=Deferred();
            return deferPool;
        }
        console.log('pool free');
    };
    const releasePool=()=>{
        pool--;
        console.log('releasePool:'+pool);
        if(pool<poolSize&&deferPool){
            deferPool.resolve();
            deferPool=null;
        }
    };

    while (await _cursor.hasNext()){
        each(await _cursor.next())
            .then(done)
            .catch(check);
        if(poolSize){
            await checkAndAddPool();
        }
    }

    defer.then(()=>{
        _cursor.close()
    });

    return defer;
};

export const getCollection=async function({
    db,
    collection
}){
    const _db= await MongoClient.connect(db);
    const col=_db.collection(collection);
    col._db=_db;
    return col;
};