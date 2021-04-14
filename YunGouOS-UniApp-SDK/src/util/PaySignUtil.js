import md5 from 'md5';
import Common from '../common/Common';


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


/**
 * 验证回调签名是否正确
 * @param {*} params 
 * @param {*} key 
 */
function checkNotifySign(params, sign, key) {
    if (Common.isEmpty(params)) {
        console.error("yungouos sdk error", "params参数不能为空");
        return false;
    }
    if (Common.isEmpty(sign)) {
        console.error("yungouos sdk error", "sign不能为空");
        return false;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "key不能空");
        return false;
    }
    let newSign = paySign(params, key);
    if (sign != newSign) {
        console.error("yungouos sdk error", "回调签名验证失败");
        return false;
    }
    return true;
}

export default {
    "paySign": paySign,
    "checkNotifySign": checkNotifySign
}