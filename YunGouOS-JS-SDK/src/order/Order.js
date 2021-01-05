import Common from '../common/Common';
import OrderConfig from '../config/OrderConfig';
import HttpUtil from '../util/HttpUtil';
import PaySignUtil from '../util/PaySignUtil';

/**
 * 根据订单号查询支付订单（同步）
 * 
 * 注意：该接口限流，规则为1qps/10s。
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/system/order/getPayOrderInfo
 * 
 * @param {*} out_trade_no  商户订单号
 * @param {*} mch_id 商户号 登录YunGouOS.com-》微信支付/支付宝-》商户管理 查看商户号
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》微信支付/支付宝-》商户管理 查看支付密钥
 */ 
async function getOrderInfoAsync(out_trade_no,mch_id,payKey) {
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "商户订单号不能为空");
        return null;
    }
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
        return null;
    }
    let params = {
        out_trade_no: out_trade_no,
        mch_id: mch_id
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    let response = await HttpUtil.post(OrderConfig.getPayOrderInfoUrl, params);
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
 * 根据订单号查询支付订单（异步）
 * 
 * 注意：该接口限流，规则为1qps/10s。
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/system/order/getPayOrderInfo
 * 
 * @param {*} out_trade_no  商户订单号
 * @param {*} mch_id 商户号 登录YunGouOS.com-》微信支付/支付宝-》商户管理 查看商户号
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》微信支付/支付宝-》商户管理 查看支付密钥
 */
function getOrderInfo(out_trade_no, mch_id, payKey) {
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "商户订单号不能为空");
        return null;
    }
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
        return null;
    }
    let params = {
        out_trade_no: out_trade_no,
        mch_id: mch_id
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    return HttpUtil.post(OrderConfig.getPayOrderInfoUrl, params);
}

export default {
    getOrderInfoAsync,
    getOrderInfo
}