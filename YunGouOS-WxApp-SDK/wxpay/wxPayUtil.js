import md5 from 'md5'

/**
 * 
 * @param {微信支付签名} params 
 * @param {*} key 
 */
function wxPaySign(params, key) {
    const paramsArr = Object.keys(params);
    paramsArr.sort();
    const stringArr = []
    paramsArr.map(key => {
        stringArr.push(key + '=' + params[key]);
    })
    // 最后加上 商户Key
    stringArr.push("key=" + key)
    const string = stringArr.join('&');
    return md5.md5(string).toString().toUpperCase();
}

/**
 * 生成订单号
 * @param {订单号前缀} str 
 */
function getOrderNo(str) {
    let outTradeNo = "";  //订单号
    for (var i = 0; i < 6; i++) //6位随机数，用以加在时间戳后面。
    {
        outTradeNo += Math.floor(Math.random() * 10);
    }
    outTradeNo = str + new Date().getTime() + outTradeNo;  //时间戳，用来生成订单号。
    return outTradeNo;
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
 * 暴露方法外部调用
 */
export default {
    "wxPaySign": wxPaySign,
    "getOrderNo": getOrderNo,
    "formatMoney": formatMoney
}