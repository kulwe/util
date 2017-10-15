/**
 * Created by kule on 2017/9/6.
 */
export const getFloatLength = (num) => {
    let len;
    try {
        len = num.toString().split(".")[1].length
    } catch (e) {
        len = 0
    }
    return len;
};
const removeDot = (num) => {
    return Number(num.toString().replace(".", ""));
};
export const getFloatMaxLength = (num1, num2) => {
    return Math.max(getFloatLength(num1), getFloatLength(num2));
};
export const floatAdd = (arg1, arg2) => {
    const max = getFloatMaxLength(arg1, arg2);
    const m = Math.pow(10, max);
    return (arg1 * m + arg2 * m) / m;
};

export const floatSub = (arg1, arg2) => {
    const len1 = getFloatLength(arg1);
    const len2 = getFloatLength(arg2);
    const m = Math.pow(10, Math.max(len1, len2));
    //动态控制精度长度  
    const n = (len1 >= len2) ? len1 : len2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
};

export const floatMul = (arg1, arg2) => {
    const len1 = getFloatLength(arg1);
    const len2 = getFloatLength(arg2);
    const m = len1 + len2;
    return removeDot(arg1) * removeDot(arg2) / Math.pow(10, m)
};

export const floatDiv = (arg1, arg2) => {
    const len1 = getFloatLength(arg1);
    const len2 = getFloatLength(arg2);
    return (removeDot(arg1) / removeDot(arg2)) * Math.pow(10, len2 - len1);
};