
/**
 * 统一处理api返回结果
 * @param {api返回结果} response 
 */
function doApiResult(response) {
    if (isEmpty(response)) {
        console.error("yungouos pay sdk", "请求API无响应");
        return null;
    }
    if (response.code != 0) {
        console.error("yungouos pay sdk", response);
        return null;
    }
    return response;
}


/**
 * 
 * @param {金额} long_data 
 * @param { 可选,格式化金额精度, 即小数点位数. 如: 3 标示保留小数点后三位, 默认为2位} length 
 */
function formatMoney(long_data, length) {
    length = length > 0 && length <= 20 ? length : 2;
    long_data = parseFloat((long_data + "").replace(/[^\d\.-]/g, "")).toFixed(length) + "";
    let l = long_data.split(".")[0].split("").reverse();
    let r = long_data.split(".")[1];
    let t = "";
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}



/**
 * 是否为空
 * @param {*} obj 
 */
function isEmpty(obj) {
    if (obj === undefined || obj === null || obj === '') {
        return true;
    }
    if (obj instanceof Function) {
        return false;
    }
    if (obj instanceof Array) {
        return obj.length == 0
    }

    if (obj instanceof Date) {
        return false
    }
    if (obj instanceof Object) {

        return Object.keys ? Object.keys(obj).length == 0 : JSON.stringify(obj) == "{}";
    }
    return false;
}



/**
 * 是否object对象
 * @param {}} val 
 */
function isObject(val) {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
};

/**
 * 暴露方法外部调用
 */
export default {
    "doApiResult": doApiResult,
    "formatMoney": formatMoney,
    "isEmpty": isEmpty,
    "isObject": isObject
}