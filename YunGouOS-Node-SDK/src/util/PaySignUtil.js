import md5 from 'md5';


/**
 * 支付接口参数签名
 * @param {*} params  需要参与加密的json对象
 * @param {*} key  商户密钥 登录 http://www.yungouos.com 微信支付->商户管理 获得
 */
function paySign(params, key) {
    const paramsArr = Object.keys(params);
    paramsArr.sort();
    const stringArr = []
    paramsArr.map(key => {
        stringArr.push(key + '=' + params[key]);
    })
    // 最后加上 商户Key
    stringArr.push("key=" + key)
    const string = stringArr.join('&');
    return md5(string).toString().toUpperCase();
}

export default {
    "paySign": paySign
}