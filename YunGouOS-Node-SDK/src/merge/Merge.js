import Common from '../common/Common';
import MergePayConfig from '../config/MergePayConfig';
import HttpUtil from '../util/HttpUtil';
import PaySignUtil from '../util/PaySignUtil';


/**
 * 一码付（同步）
 *
 * 同步发起一码付 返回原生支付链接或二维码连接地址，根据type类型决定
 *
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/merge/nativePay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 聚合支付商户号 登录yungouos.com-》聚合支付-》商户管理 支付宝商户号 获取
 * @param {*} body 商品描述
 * @param {*} type 返回类型（1、返回原生的支付连接需要自行生成二维码；2、直接返回付款二维码地址，页面上展示即可。不填默认1）
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} return_url 同步地址，支付完毕后用户浏览器返回到该地址，如果不传递，页面支付完成后页面自动关闭，强烈建议传递。url不可包含？号、不可携带参数，不填则无回调
 * @param {*} auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0
 * @param {*} auto_node 执行自动分账动作的节点，枚举值【pay、callback】分别表示【付款成功后分账、回调成功后分账】
 * @param {*} config_no 分账配置单号。支持多个分账，使用,号分割
 * @param {*} payKey 支付密钥 登录yungouos.com-》聚合支付-》商户管理 支付密钥 获取
 * @return {*} 返回二维码支付链接地址或原生支付链接
 */
async function nativePayAsync(out_trade_no, total_fee, mch_id, body, type, attach, notify_url, return_url, auto, auto_node, config_no, payKey) {
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
    if (!Common.isEmpty(return_url)) {
        params.return_url = return_url;
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
    let response = await HttpUtil.post(MergePayConfig.nativePay, params);
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
 * 一码付（异步）
 *
 * 同步发起一码付 返回原生支付链接或二维码连接地址，根据type类型决定
 *
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/merge/nativePay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 聚合支付商户号 登录yungouos.com-》聚合支付-》商户管理 商户号 获取
 * @param {*} body 商品描述
 * @param {*} type 返回类型（1、返回原生的支付连接需要自行生成二维码；2、直接返回付款二维码地址，页面上展示即可。不填默认1）
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} return_url 同步地址，支付完毕后用户浏览器返回到该地址，如果不传递，页面支付完成后页面自动关闭，强烈建议传递。url不可包含？号、不可携带参数，不填则无回调
 * @param {*} auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0
 * @param {*} auto_node 执行自动分账动作的节点，枚举值【pay、callback】分别表示【付款成功后分账、回调成功后分账】
 * @param {*} config_no 分账配置单号。支持多个分账，使用,号分割
 * @param {*} payKey 支付密钥 登录yungouos.com-》聚合支付-》商户管理 支付密钥 获取
 * @return {*} 返回二维码支付链接地址或原生支付链接
 */
function nativePay(out_trade_no, total_fee, mch_id, body, type, attach, notify_url, return_url, auto, auto_node, config_no, payKey) {
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
    if (!Common.isEmpty(return_url)) {
        params.return_url = return_url;
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
    return HttpUtil.post(MergePayConfig.nativePay, params);
}




/**
 * 一码收（同步）
 *
 * 支持微信、支付宝的统一条码收款，适合扫码枪、扫码盒子等设备扫描微信、支付宝付款码，接口自动识别码类型进行收款。
 *
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/merge/codePay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 聚合支付商户号 登录yungouos.com-》聚合支付-》商户管理 支付宝商户号 获取
 * @param {*} body 商品描述
 * @param {*} app_id YunGouOS平台报备的app_id。
 * @param {*} auth_code 支付授权码，通过设备读取用户微信、支付宝中的条码信息。 
 * @param {*} receipt 是否开具电子发票 0：否 1：是 默认0
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} biz_params 附加业务参数。json对象，具体参考API文档
 * @param {*} payKey 支付密钥 登录yungouos.com-》聚合支付-》商户管理 支付密钥 获取
 * @return {*} 见API文档
 */
async function codePayAsync(out_trade_no, total_fee, mch_id, body, app_id, auth_code, receipt, attach, notify_url, biz_params, payKey) {
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
    if (Common.isEmpty(app_id)) {
        console.error("yungouos sdk error", "app_id不能为空");
        return null;
    }
    if (Common.isEmpty(auth_code)) {
        console.error("yungouos sdk error", "auth_code不能为空");
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
        app_id: app_id,
        auth_code: auth_code
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    if (!Common.isEmpty(receipt)) {
        params.receipt = receipt;
    }
    if (!Common.isEmpty(attach)) {
        params.attach = attach;
    }
    if (!Common.isEmpty(notify_url)) {
        params.notify_url = notify_url;
    }
    if (!Common.isEmpty(biz_params)) {
        if (!Common.isObject(biz_params)) {
            console.error("yungouos sdk error", "biz_params不是合法的json");
            return null;
        }
        params.biz_params = JSON.stringify(biz_params);
    }
    let response = await HttpUtil.post(MergePayConfig.codePay, params);
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
 * 一码收（异步）
 *
 * 支持微信、支付宝的统一条码收款，适合扫码枪、扫码盒子等设备扫描微信、支付宝付款码，接口自动识别码类型进行收款。
 *
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/merge/codePay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 聚合支付商户号 登录yungouos.com-》聚合支付-》商户管理 支付宝商户号 获取
 * @param {*} body 商品描述
 * @param {*} app_id YunGouOS平台报备的app_id。
 * @param {*} auth_code 支付授权码，通过设备读取用户微信、支付宝中的条码信息。 
 * @param {*} receipt 是否开具电子发票 0：否 1：是 默认0
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} biz_params 附加业务参数。json对象，具体参考API文档
 * @param {*} payKey 支付密钥 登录yungouos.com-》聚合支付-》商户管理 支付密钥 获取
 * @return {*} 见API文档
 */
function codePay(out_trade_no, total_fee, mch_id, body, app_id, auth_code, receipt, attach, notify_url, biz_params, payKey) {
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
    if (Common.isEmpty(app_id)) {
        console.error("yungouos sdk error", "app_id不能为空");
        return null;
    }
    if (Common.isEmpty(auth_code)) {
        console.error("yungouos sdk error", "auth_code不能为空");
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
        app_id: app_id,
        auth_code: auth_code
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    if (!Common.isEmpty(receipt)) {
        params.receipt = receipt;
    }
    if (!Common.isEmpty(attach)) {
        params.attach = attach;
    }
    if (!Common.isEmpty(notify_url)) {
        params.notify_url = notify_url;
    }
    if (!Common.isEmpty(biz_params)) {
        if (!Common.isObject(biz_params)) {
            console.error("yungouos sdk error", "biz_params不是合法的json");
            return null;
        }
        params.biz_params = JSON.stringify(biz_params);
    }
    return HttpUtil.post(MergePayConfig.codePay, params);
}


export default {
    nativePayAsync,
    nativePay,
    codePayAsync,
    codePay
}