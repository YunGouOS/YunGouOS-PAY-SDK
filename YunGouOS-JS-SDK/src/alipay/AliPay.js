import Common from '../common/Common';
import AliPayConfig from '../config/AliPayConfig';
import HttpUtil from '../util/HttpUtil';
import PaySignUtil from '../util/PaySignUtil';


/**
 * 扫码支付（同步）
 *
 * 同步发起扫码支付 返回原生支付链接或二维码连接地址，根据type类型决定
 *
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/alipay/nativePay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 支付宝商户号 登录yungouos.com-》支付宝-》商户管理 支付宝商户号 获取
 * @param {*} body 商品描述
 * @param {*} type 返回类型（1、返回支付宝原生的支付连接需要自行生成二维码；2、直接返回付款二维码地址，页面上展示即可。不填默认1）
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} payKey 支付密钥 登录yungouos.com-》支付宝-》商户管理 支付密钥 获取
 * @return {*} 返回二维码支付链接地址或原生支付链接
 */
async function nativePayAsync(out_trade_no, total_fee, mch_id, body, type, attach, notify_url, payKey) {
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "商户订单号不能为空");
        return null;
    }
    if (Common.isEmpty(total_fee)) {
        console.error("yungouos sdk error", "支付金额不能为空");
        return null;
    }
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(body)) {
        console.error("yungouos sdk error", "商品名称不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
        return null;
    }
    let params = {
        out_trade_no: out_trade_no,
        total_fee: total_fee,
        mch_id: mch_id,
        body: body,
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    if (!Common.isEmpty(type)) {
        params.type = type;
    }
    if (!Common.isEmpty(attach)) {
        params.attach = attach;
    }
    if (!Common.isEmpty(notify_url)) {
        params.notify_url = notify_url;
    }
    let response = await HttpUtil.post(AliPayConfig.nativePay, params);
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
 * 扫码支付（异步）
 *
 * 同步发起扫码支付 返回原生支付链接或二维码连接地址，根据type类型决定
 *
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/alipay/nativePay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 支付宝商户号 登录yungouos.com-》支付宝-》商户管理 支付宝商户号 获取
 * @param {*} body 商品描述
 * @param {*} type 返回类型（1、返回支付宝原生的支付连接需要自行生成二维码；2、直接返回付款二维码地址，页面上展示即可。不填默认1）
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} payKey 支付密钥 登录yungouos.com-》支付宝-》商户管理 支付密钥 获取
 * @return {*} 返回Promise化结果，需要自行处理返回结果
 */
function nativePay(out_trade_no, total_fee, mch_id, body, type, attach, notify_url, payKey) {
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "商户订单号不能为空");
        return null;
    }
    if (Common.isEmpty(total_fee)) {
        console.error("yungouos sdk error", "支付金额不能为空");
        return null;
    }
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(body)) {
        console.error("yungouos sdk error", "商品名称不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
        return null;
    }
    let params = {
        out_trade_no: out_trade_no,
        total_fee: total_fee,
        mch_id: mch_id,
        body: body,
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    if (!Common.isEmpty(type)) {
        params.type = type;
    }
    if (!Common.isEmpty(attach)) {
        params.attach = attach;
    }
    if (!Common.isEmpty(notify_url)) {
        params.notify_url = notify_url;
    }
    return HttpUtil.post(AliPayConfig.nativePay, params);
}



/**
 * WAP支付（同步）
 *
 * 返回支付宝WAP支付连接，重定向到该地址即可。安装了支付宝APP将自动唤起支付宝APP进行支付
 *
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/alipay/wapPay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 支付宝商户号 登录yungouos.com-》支付宝-》商户管理 支付宝商户号 获取
 * @param {*} body 商品描述
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} payKey 支付密钥 登录yungouos.com-》支付宝-》商户管理 支付密钥 获取
 * @return {*} 返回支付宝WAP支付连接
 */
async function wapPayAsync(out_trade_no, total_fee, mch_id, body, attach, notify_url, payKey) {
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "商户订单号不能为空");
        return null;
    }
    if (Common.isEmpty(total_fee)) {
        console.error("yungouos sdk error", "支付金额不能为空");
        return null;
    }
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(body)) {
        console.error("yungouos sdk error", "商品名称不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
        return null;
    }
    let params = {
        out_trade_no: out_trade_no,
        total_fee: total_fee,
        mch_id: mch_id,
        body: body,
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    if (!Common.isEmpty(attach)) {
        params.attach = attach;
    }
    if (!Common.isEmpty(notify_url)) {
        params.notify_url = notify_url;
    }
    let response = await HttpUtil.post(AliPayConfig.wapPay, params);
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
 * WAP支付（异步）
 *
 * 返回支付宝WAP支付连接，重定向到该地址即可。安装了支付宝APP将自动唤起支付宝APP进行支付
 *
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/alipay/wapPay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 支付宝商户号 登录yungouos.com-》支付宝-》商户管理 支付宝商户号 获取
 * @param {*} body 商品描述
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} payKey 支付密钥 登录yungouos.com-》支付宝-》商户管理 支付密钥 获取
 * @return {*} 返回支付宝WAP支付连接
 */
function wapPay(out_trade_no, total_fee, mch_id, body, attach, notify_url, payKey) {
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "商户订单号不能为空");
        return null;
    }
    if (Common.isEmpty(total_fee)) {
        console.error("yungouos sdk error", "支付金额不能为空");
        return null;
    }
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(body)) {
        console.error("yungouos sdk error", "商品名称不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
        return null;
    }
    let params = {
        out_trade_no: out_trade_no,
        total_fee: total_fee,
        mch_id: mch_id,
        body: body,
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    if (!Common.isEmpty(attach)) {
        params.attach = attach;
    }
    if (!Common.isEmpty(notify_url)) {
        params.notify_url = notify_url;
    }
    return HttpUtil.post(AliPayConfig.wapPay, params);
}


export default {
    nativePayAsync,
    nativePay,
    wapPayAsync,
    wapPay
}