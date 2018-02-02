const {generateToast}=require('../lib/toast');

const showToast=({
    text,
    duration,
    mask
})=>{
    console.log(text);
    console.log(duration);
    console.log(mask);
};

const hideToast=()=>{
    console.log('hide');
};

const update=showToast;


const toast=generateToast({
    show:showToast,
    update,
    hide:hideToast
});

toast.show({
    text:'显示3秒1',
    duration:3000
});

toast.show({
    text:'显示10秒2',
    duration:10000
});

toast.show({
    text:'显示5秒3',
    duration:5000,
    mask:true
});

toast.show({
    text:'显示6秒4',
    duration:6000
});

toast.show({
    text:'显示3秒5',
    duration:3000
});