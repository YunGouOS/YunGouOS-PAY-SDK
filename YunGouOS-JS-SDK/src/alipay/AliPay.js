import Common from '../common/Common';
import AliPayConfig from '../config/AliPayConfig';
import HttpUtil from '../util/HttpUtil';
import PaySignUtil from '../util/PaySignUtil';


/**
 * 同步发起扫码支付 返回原生二维码链接或二维码连接地址，根据type类型决定
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 微信支付商户号
 * @param {*} body 商品描述
 * @param {*} type 返回类型（1、返回微信原生的支付连接需要自行生成二维码；2、直接返回付款二维码地址，页面上展示即可。不填默认1 ）
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0
 * @param {*} auto_node 执行自动分账动作的节点，枚举值【pay、callback】分别表示【付款成功后分账、回调成功后分账】
 * @param {*} config_no 分账配置单号。支持多个分账，使用,号分割
 * @param {*} payKey 
 */
async function nativePayAsync(out_trade_no, total_fee, mch_id, body, type, attach, notify_url, auto, auto_node, config_no, payKey) {
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
    if (!Common.isEmpty(auto)) {
        params.auto = auto;
    }
    if (!Common.isEmpty(auto_node)) {
        params.auto_node = auto_node;
    }
    if (!Common.isEmpty(config_no)) {
        params.config_no = config_no;
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

export default {
    nativePayAsync
}