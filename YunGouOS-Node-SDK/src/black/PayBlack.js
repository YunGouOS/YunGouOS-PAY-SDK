import Common from '../common/Common';
import PayBlackConfig from '../config/PayBlackConfig';
import HttpUtil from '../util/HttpUtil';
import PaySignUtil from '../util/PaySignUtil';

/**
 * 
 * 创建支付盾黑名单（同步）
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/pay/black/create
 * 
 * @param {*} mch_id 微信支付商户号/支付宝商户号
 * @param {*} account 用户的openid或支付宝唯一身份id（2088开头）
 * @param {*} reason 原因 
 * @param {*} end_time 黑名单有效期截至时间，不传则永久。示例值：2021-06-24 23:59:59
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》微信支付/支付宝-》商户管理-》 支付密钥 查看密钥
 */
async function createAsync(mch_id, account, reason, end_time, payKey) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(account)) {
        console.error("yungouos sdk error", "用户账户不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
        return null;
    }
    let params = {
        mch_id: mch_id,
        account: account
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    if (!Common.isEmpty(reason)) {
        params.reason = reason;
    }
    if (!Common.isEmpty(end_time)) {
        params.end_time = end_time;
    }
    let response = await HttpUtil.post(PayBlackConfig.getCreateUrl, params);
    let result = Common.doApiResult(response);
    if (Common.isEmpty(result)) {
        return null;
    }
    let data = result.data;
    if (Common.isEmpty(data)) {
        console.error("yungouos sdk error", "API无返回结果");
        return null;
    }
    return data;
}



/**
 * 
 * 创建支付盾黑名单（异步）
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/pay/black/create
 * 
 * @param {*} mch_id 微信支付商户号/支付宝商户号
 * @param {*} account 用户的openid或支付宝唯一身份id（2088开头）
 * @param {*} reason 原因 
 * @param {*} end_time 黑名单有效期截至时间，不传则永久。示例值：2021-06-24 23:59:59
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》微信支付/支付宝-》商户管理-》 支付密钥 查看密钥
 */
function create(mch_id, account, reason, end_time, payKey) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(account)) {
        console.error("yungouos sdk error", "用户账户不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
        return null;
    }
    let params = {
        mch_id: mch_id,
        account: account
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    if (!Common.isEmpty(reason)) {
        params.reason = reason;
    }
    if (!Common.isEmpty(end_time)) {
        params.end_time = end_time;
    }
    return HttpUtil.post(PayBlackConfig.getCreateUrl, params);
}



/**
 * 
 * 验证用户是否是黑名单（同步）
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/pay/black/check
 * 
 * @param {*} mch_id 微信支付商户号/支付宝商户号
 * @param {*} account 用户的openid或支付宝唯一身份id（2088开头）
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》微信支付/支付宝-》商户管理-》 支付密钥 查看密钥
 */
async function checkAsync(mch_id, account, payKey) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(account)) {
        console.error("yungouos sdk error", "用户账户不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
        return null;
    }
    let params = {
        mch_id: mch_id,
        account: account
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    let response = await HttpUtil.get(PayBlackConfig.getCheckUrl, params);
    let result = Common.doApiResult(response);
    if (Common.isEmpty(result)) {
        return null;
    }
    let data = result.data;
    if (Common.isEmpty(data)) {
        console.error("yungouos sdk error", "API无返回结果");
        return null;
    }
    return data;
}



/**
 * 
 * 验证用户是否是黑名单（异步）
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/pay/black/check
 * 
 * @param {*} mch_id 微信支付商户号/支付宝商户号
 * @param {*} account 用户的openid或支付宝唯一身份id（2088开头）
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》微信支付/支付宝-》商户管理-》 支付密钥 查看密钥
 */
function check(mch_id, account, payKey) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(account)) {
        console.error("yungouos sdk error", "用户账户不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
        return null;
    }
    let params = {
        mch_id: mch_id,
        account: account
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    return HttpUtil.get(PayBlackConfig.getCheckUrl, params);
}


export default {
    createAsync,
    create,
    checkAsync,
    check
}