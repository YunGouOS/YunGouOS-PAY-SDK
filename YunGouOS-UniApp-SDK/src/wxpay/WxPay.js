import Common from '../common/Common';
import WxPayConfig from '../config/WxPayConfig';
import HttpUtil from '../util/HttpUtil';
import PaySignUtil from '../util/PaySignUtil';


/**
 * 刷卡支付（同步）
 * 
 * 线下付款码被扫支付，用于扫码枪、扫码盒子、刷脸支付等场景
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/codePay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} body 商品描述
 * @param {*} auth_code 返回类型（1、返回微信原生的支付连接需要自行生成二维码；2、直接返回付款二维码地址，页面上展示即可。不填默认1 ）
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} receipt 是否开具电子发票 0：否 1：是 默认0
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0
 * @param {*} auto_node 执行自动分账动作的节点，枚举值【pay、callback】分别表示【付款成功后分账、回调成功后分账】
 * @param {*} config_no 分账配置单号。支持多个分账，使用,号分割
 * @param {*} biz_params 附加业务参数。json对象，具体参考API文档
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
* @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/codePay
 */
async function codePayAsync(out_trade_no, total_fee, mch_id, body, auth_code, attach, receipt, notify_url, auto, auto_node, config_no, biz_params, payKey) {
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
    if (Common.isEmpty(auth_code)) {
        console.error("yungouos sdk error", "支付授权码不能为空");
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
        auth_code: auth_code
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    if (!Common.isEmpty(attach)) {
        params.attach = attach;
    }
    if (!Common.isEmpty(receipt)) {
        params.receipt = receipt;
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
    if (!Common.isEmpty(biz_params)) {
        if (!Common.isObject(biz_params)) {
            console.error("yungouos sdk error", "biz_params不是合法的json");
            return null;
        }
        params.biz_params = JSON.stringify(biz_params);
    }
    let response = await HttpUtil.post(WxPayConfig.codePay, params);
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
 * 刷卡支付（异步）
 * 
 * 线下付款码被扫支付，用于扫码枪、扫码盒子、刷脸支付等场景
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/codePay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} body 商品描述
 * @param {*} auth_code 返回类型（1、返回微信原生的支付连接需要自行生成二维码；2、直接返回付款二维码地址，页面上展示即可。不填默认1 ）
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} receipt 是否开具电子发票 0：否 1：是 默认0
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0
 * @param {*} auto_node 执行自动分账动作的节点，枚举值【pay、callback】分别表示【付款成功后分账、回调成功后分账】
 * @param {*} config_no 分账配置单号。支持多个分账，使用,号分割
 * @param {*} biz_params 附加业务参数。json对象，具体参考API文档
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
* @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/codePay
 */
function codePay(out_trade_no, total_fee, mch_id, body, auth_code, attach, receipt, notify_url, auto, auto_node, config_no, biz_params, payKey) {
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
    if (Common.isEmpty(auth_code)) {
        console.error("yungouos sdk error", "支付授权码不能为空");
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
        auth_code: auth_code
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    if (!Common.isEmpty(attach)) {
        params.attach = attach;
    }
    if (!Common.isEmpty(receipt)) {
        params.receipt = receipt;
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
    if (!Common.isEmpty(biz_params)) {
        if (!Common.isObject(biz_params)) {
            console.error("yungouos sdk error", "biz_params不是合法的json");
            return null;
        }
        params.biz_params = JSON.stringify(biz_params);
    }
    return HttpUtil.post(WxPayConfig.codePay, params);
}


/**
 * 扫码支付（同步）
 * 
 * 同步发起扫码支付 返回原生支付链接或二维码连接地址，根据type类型决定
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/nativePay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} body 商品描述
 * @param {*} type 返回类型（1、返回微信原生的支付连接需要自行生成二维码；2、直接返回付款二维码地址，页面上展示即可。不填默认1 ）
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0
 * @param {*} auto_node 执行自动分账动作的节点，枚举值【pay、callback】分别表示【付款成功后分账、回调成功后分账】
 * @param {*} config_no 分账配置单号。支持多个分账，使用,号分割
 * @param {*} biz_params 附加业务参数。json对象，具体参考API文档
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
 * @return {*} 返回二维码支付链接地址或原生支付链接
 */
async function nativePayAsync(out_trade_no, total_fee, mch_id, body, type, attach, notify_url, auto, auto_node, config_no, biz_params, payKey) {
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
    if (!Common.isEmpty(biz_params)) {
        if (!Common.isObject(biz_params)) {
            console.error("yungouos sdk error", "biz_params不是合法的json");
            return null;
        }
        params.biz_params = JSON.stringify(biz_params);
    }
    let response = await HttpUtil.post(WxPayConfig.nativePay, params);
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
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/nativePay
 *
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} body 商品描述
 * @param {*} type 返回类型（1、返回微信原生的支付连接需要自行生成二维码；2、直接返回付款二维码地址，页面上展示即可。不填默认1 ）
 * @param {*} attach 附加数据，回调时候原路返回
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0
 * @param {*} auto_node 执行自动分账动作的节点，枚举值【pay、callback】分别表示【付款成功后分账、回调成功后分账】
 * @param {*} config_no 分账配置单号。支持多个分账，使用,号分割
 * @param {*} biz_params 附加业务参数。json对象，具体参考API文档
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
 * @return {*} 返回Promise化结果，需要自行处理返回结果
 */
function nativePay(out_trade_no, total_fee, mch_id, body, type, attach, notify_url, auto, auto_node, config_no, biz_params, payKey) {
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
    if (!Common.isEmpty(biz_params)) {
        if (!Common.isObject(biz_params)) {
            console.error("yungouos sdk error", "biz_params不是合法的json");
            return null;
        }
        params.biz_params = JSON.stringify(biz_params);
    }
    return HttpUtil.post(WxPayConfig.nativePay, params);
}



/**
 * 公众号支付/JSAPI（同步）
 * 
 * 用户在公众号内的商户H5页面发起支付。
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/jsapi
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} body 商品描述
 * @param {*} openId 用户openId 通过授权接口获得
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} return_url 同步地址。支付完毕后用户浏览器返回到该地址
 * @param {*} auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0
 * @param {*} auto_node 执行自动分账动作的节点，枚举值【pay、callback】分别表示【付款成功后分账、回调成功后分账】
 * @param {*} config_no 分账配置单号。支持多个分账，使用,号分割
 * @param {*} biz_params 附加业务参数。json对象，具体参考API文档
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
 * @return {*} JSSDK支付需要的jspackage
 */
async function jsapiPayAsync(out_trade_no, total_fee, mch_id, body, openId, attach, notify_url,return_url, auto, auto_node, config_no, biz_params, payKey) {
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
    if (Common.isEmpty(openId)) {
        console.error("yungouos sdk error", "openId不能为空");
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
        openId: openId
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
    if (!Common.isEmpty(biz_params)) {
        if (!Common.isObject(biz_params)) {
            console.error("yungouos sdk error", "biz_params不是合法的json");
            return null;
        }
        params.biz_params = JSON.stringify(biz_params);
    }
    let response = await HttpUtil.post(WxPayConfig.jsapiPay, params);
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
 * 公众号支付/JSAPI（异步）
 * 
 * 用户在微信内的商户H5页面发起支付。
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/jsapi
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} body 商品描述
 * @param {*} openId 用户openId 通过授权接口获得
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} return_url 同步地址。支付完毕后用户浏览器返回到该地址
 * @param {*} auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0
 * @param {*} auto_node 执行自动分账动作的节点，枚举值【pay、callback】分别表示【付款成功后分账、回调成功后分账】
 * @param {*} config_no 分账配置单号。支持多个分账，使用,号分割
 * @param {*} biz_params 附加业务参数。json对象，具体参考API文档
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
* @return {*} JSSDK支付需要的jspackage
 */
function jsapiPay(out_trade_no, total_fee, mch_id, body, openId, attach, notify_url,return_url, auto, auto_node, config_no, biz_params, payKey) {
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
    if (Common.isEmpty(openId)) {
        console.error("yungouos sdk error", "openId不能为空");
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
        openId: openId
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
    if (!Common.isEmpty(biz_params)) {
        if (!Common.isObject(biz_params)) {
            console.error("yungouos sdk error", "biz_params不是合法的json");
            return null;
        }
        params.biz_params = JSON.stringify(biz_params);
    }
    return HttpUtil.post(WxPayConfig.jsapiPay, params);
}




/**
 * 收银台支付（同步）
 * 
 * 收银台支付是进一步对支付接口的封装，商户无需关注调用什么接口，收银台自动识别用户设备完成发起支付并提供相关支付页面。尤其是公众号支付需要获取openid，使用收银台支付商户无需关注该流程，收银台自动完成该操作。用户在页面完成支付后返回商户自己网站，收银台将携带参数重定向到商户传递的return_url上。重定向携带参数与异步回调参数一致，通过url拼接方式
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/cashierPay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} body 商品描述
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} return_url 同步回调地址，不传支付后关闭页面
 * @param {*} auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0
 * @param {*} auto_node 执行自动分账动作的节点，枚举值【pay、callback】分别表示【付款成功后分账、回调成功后分账】
 * @param {*} config_no 分账配置单号。支持多个分账，使用,号分割
 * @param {*} biz_params 附加业务参数。json对象，具体参考API文档
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
 * @return {*} 收银台支付链接地址
 */
async function cashierPayAsync(out_trade_no, total_fee, mch_id, body, attach, notify_url, return_url, auto, auto_node, config_no, biz_params, payKey) {
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
    if (!Common.isEmpty(biz_params)) {
        if (!Common.isObject(biz_params)) {
            console.error("yungouos sdk error", "biz_params不是合法的json");
            return null;
        }
        params.biz_params = JSON.stringify(biz_params);
    }
    let response = await HttpUtil.post(WxPayConfig.cashierPay, params);
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
 * 收银台支付（异步）
 * 
 * 收银台支付是进一步对支付接口的封装，商户无需关注调用什么接口，收银台自动识别用户设备完成发起支付并提供相关支付页面。尤其是公众号支付需要获取openid，使用收银台支付商户无需关注该流程，收银台自动完成该操作。用户在页面完成支付后返回商户自己网站，收银台将携带参数重定向到商户传递的return_url上。重定向携带参数与异步回调参数一致，通过url拼接方式
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/cashierPay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} body 商品描述
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} return_url 同步回调地址，不传支付后关闭页面
 * @param {*} auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0
 * @param {*} auto_node 执行自动分账动作的节点，枚举值【pay、callback】分别表示【付款成功后分账、回调成功后分账】
 * @param {*} config_no 分账配置单号。支持多个分账，使用,号分割
 * @param {*} biz_params 附加业务参数。json对象，具体参考API文档
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
 * @return {*} 收银台支付链接地址
 */
function cashierPay(out_trade_no, total_fee, mch_id, body, attach, notify_url, return_url, auto, auto_node, config_no, biz_params, payKey) {
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
    if (!Common.isEmpty(biz_params)) {
        if (!Common.isObject(biz_params)) {
            console.error("yungouos sdk error", "biz_params不是合法的json");
            return null;
        }
        params.biz_params = JSON.stringify(biz_params);
    }
    return HttpUtil.post(WxPayConfig.cashierPay, params);
}



/**
 * 小程序支付（个人）
 *
 * 微信小程序支付，拉起支付收银小程序进行支付
 *
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/minPay
 *
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} body 商品描述
 * @param {*} attach 附加数据，回调时候原路返回
 * @param {*} title 支付收银小程序页面顶部的title 可自定义品牌名称 不传默认为 “收银台” 如传递参数 “海底捞” 页面则显示 “海底捞-收银台”
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0
 * @param {*} auto_node 执行自动分账动作的节点，枚举值【pay、callback】分别表示【付款成功后分账、回调成功后分账】
 * @param {*} config_no 分账配置单号。支持多个分账，使用,号分割
 * @param {*} biz_params 附加业务参数。json对象，具体参考API文档
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
 * @return {*} 拉起“支付收银小程序”
 */
function minAppPay(out_trade_no, total_fee, mch_id, body, attach, title, notify_url, auto, auto_node, config_no, biz_params, payKey) {
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
    if (!Common.isEmpty(title)) {
        params.title = title;
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
    if (!Common.isEmpty(biz_params)) {
        if (!Common.isObject(biz_params)) {
            console.error("yungouos sdk error", "biz_params不是合法的json");
            return null;
        }
        params.biz_params = JSON.stringify(biz_params);
    }
    uni.openEmbeddedMiniProgram({
        appId: 'wxd9634afb01b983c0',//支付收银小程序的appid 固定值 不可修改
        path: '/pages/pay/pay',//支付页面 固定值 不可修改
        extraData: params,//携带的参数 参考API文档
        success(res) {
            console.log("小程序拉起成功");
        }
    })
}


/**
 * 小程序支付（个人）
 *
 * 微信小程序支付，获取小程序支付所需参数，需自行通过小程序跳转API发起支付
 *
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/minPay
 *
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} body 商品描述
 * @param {*} attach 附加数据，回调时候原路返回
 * @param {*} title 支付收银小程序页面顶部的title 可自定义品牌名称 不传默认为 “收银台” 如传递参数 “海底捞” 页面则显示 “海底捞-收银台”
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0
 * @param {*} auto_node 执行自动分账动作的节点，枚举值【pay、callback】分别表示【付款成功后分账、回调成功后分账】
 * @param {*} config_no 分账配置单号。支持多个分账，使用,号分割
 * @param {*} biz_params 附加业务参数。json对象，具体参考API文档
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
 * @return {*} 小程序支付参数
 */
function minAppPayParams(out_trade_no, total_fee, mch_id, body, attach, title, notify_url, auto, auto_node, config_no, biz_params, payKey) {
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
    if (!Common.isEmpty(title)) {
        params.title = title;
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
    if (!Common.isEmpty(biz_params)) {
        if (!Common.isObject(biz_params)) {
            console.error("yungouos sdk error", "biz_params不是合法的json");
            return null;
        }
        params.biz_params = JSON.stringify(biz_params);
    }
    return params;
}




/**
 * 微信小程序支付（个体户、企业）
 *
 * 微信小程序支付，获取小程序支付所需参数，需自行通过小程序uni.requestPayment拉起支付
 *
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/minPay
 *
* @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} body 商品描述
 * @param {*} openId 用户openId（调用小程序uni.login接口获取）
 * @param {*} attach 附加数据，回调时候原路返回
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0
 * @param {*} auto_node 执行自动分账动作的节点，枚举值【pay、callback】分别表示【付款成功后分账、回调成功后分账】
 * @param {*} config_no 分账配置单号。支持多个分账，使用,号分割
 * @param {*} biz_params 附加业务参数。json对象，具体参考API文档
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
 * @return {*} 返回小程序API uni.requestPayment所需的支付参数
 */
function minAppPayBusiness(out_trade_no, total_fee, mch_id, body, openId, attach, notify_url, auto, auto_node, config_no, biz_params, payKey) {
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
    if (Common.isEmpty(openId)) {
        console.error("yungouos sdk error", "openId不能为空");
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
        body: body
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    params.openId = openId;
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
    if (!Common.isEmpty(biz_params)) {
        if (!Common.isObject(biz_params)) {
            console.error("yungouos sdk error", "biz_params不是合法的json");
            return null;
        }
        params.biz_params = JSON.stringify(biz_params);
    }
    return HttpUtil.post(WxPayConfig.minAppPay, params);
}



/**
 * 微信小程序支付同步（个体户、企业）
 *
 * 微信小程序支付，获取小程序支付所需参数，需自行通过小程序uni.requestPayment拉起支付
 *
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/minPay
 *
* @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} body 商品描述
 * @param {*} openId 用户openId（调用小程序uni.login接口获取）
 * @param {*} attach 附加数据，回调时候原路返回
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0
 * @param {*} auto_node 执行自动分账动作的节点，枚举值【pay、callback】分别表示【付款成功后分账、回调成功后分账】
 * @param {*} config_no 分账配置单号。支持多个分账，使用,号分割
 * @param {*} biz_params 附加业务参数。json对象，具体参考API文档
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
 * @return {*} 返回小程序API uni.requestPayment所需的支付参数
 */
async function minAppPayBusinessAsync(out_trade_no, total_fee, mch_id, body, openId, attach, notify_url, auto, auto_node, config_no, biz_params, payKey) {
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
    if (Common.isEmpty(openId)) {
        console.error("yungouos sdk error", "openId不能为空");
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
        body: body
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    params.openId = openId;
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
    if (!Common.isEmpty(biz_params)) {
        if (!Common.isObject(biz_params)) {
            console.error("yungouos sdk error", "biz_params不是合法的json");
            return null;
        }
        params.biz_params = JSON.stringify(biz_params);
    }
    let response = await HttpUtil.post(WxPayConfig.minAppPay, params);
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
 * 刷脸支付（同步）
 * 
 * 微信刷脸支付，通过微信刷脸SDK或青蛙APP调用摄像头获取到扫描人脸获取到人脸数据后，发起刷脸支付请求，进行支付扣款。
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/facePay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} body 商品描述
 * @param {*} openId 用户openId（调用授权接口获取）
 * @param {*} face_code 人脸凭证，通过摄像头配合微信刷脸SDK获得
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0
 * @param {*} auto_node 执行自动分账动作的节点，枚举值【pay、callback】分别表示【付款成功后分账、回调成功后分账】
 * @param {*} config_no 分账配置单号。支持多个分账，使用,号分割
 * @param {*} biz_params 附加业务参数。json对象，具体参考API文档
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
 * @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/facePay
 */
async function facePayAsync(out_trade_no, total_fee, mch_id, body, openId, face_code, attach, notify_url, auto, auto_node, config_no, biz_params, payKey) {
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
    if (Common.isEmpty(openId)) {
        console.error("yungouos sdk error", "openId不能为空");
        return null;
    }
    if (Common.isEmpty(face_code)) {
        console.error("yungouos sdk error", "人脸凭证不能为空");
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
        openId: openId,
        face_code: face_code
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
    if (!Common.isEmpty(auto)) {
        params.auto = auto;
    }
    if (!Common.isEmpty(auto_node)) {
        params.auto_node = auto_node;
    }
    if (!Common.isEmpty(config_no)) {
        params.config_no = config_no;
    }
    if (!Common.isEmpty(biz_params)) {
        if (!Common.isObject(biz_params)) {
            console.error("yungouos sdk error", "biz_params不是合法的json");
            return null;
        }
        params.biz_params = JSON.stringify(biz_params);
    }
    let response = await HttpUtil.post(WxPayConfig.facePay, params);
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
 * 刷脸支付（异步）
 * 
 * 微信刷脸支付，通过微信刷脸SDK或青蛙APP调用摄像头获取到扫描人脸获取到人脸数据后，发起刷脸支付请求，进行支付扣款。
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/facePay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} body 商品描述
 * @param {*} openId 用户openId（调用授权接口获取）
 * @param {*} face_code 人脸凭证，通过摄像头配合微信刷脸SDK获得
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0
 * @param {*} auto_node 执行自动分账动作的节点，枚举值【pay、callback】分别表示【付款成功后分账、回调成功后分账】
 * @param {*} config_no 分账配置单号。支持多个分账，使用,号分割
 * @param {*} biz_params 附加业务参数。json对象，具体参考API文档
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
 * @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/facePay
 */
function facePay(out_trade_no, total_fee, mch_id, body, openId, face_code, attach, notify_url, auto, auto_node, config_no, biz_params, payKey) {
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
    if (Common.isEmpty(openId)) {
        console.error("yungouos sdk error", "openId不能为空");
        return null;
    }
    if (Common.isEmpty(face_code)) {
        console.error("yungouos sdk error", "人脸凭证不能为空");
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
        openId: openId,
        face_code: face_code
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
    if (!Common.isEmpty(auto)) {
        params.auto = auto;
    }
    if (!Common.isEmpty(auto_node)) {
        params.auto_node = auto_node;
    }
    if (!Common.isEmpty(config_no)) {
        params.config_no = config_no;
    }
    if (!Common.isEmpty(biz_params)) {
        if (!Common.isObject(biz_params)) {
            console.error("yungouos sdk error", "biz_params不是合法的json");
            return null;
        }
        params.biz_params = JSON.stringify(biz_params);
    }
    return HttpUtil.post(WxPayConfig.facePay, params);
}




/**
 * H5支付（同步）
 * 
 * 微信H5支付接口，在非微信以外的第三方浏览器环境下拉起微信客户端进行付款。
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/wapPay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} body 商品描述
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} return_url 同步回调地址，用户支付成功后从微信APP跳转回该地址。调转不会携带任何参数，如需携带参数请自行拼接
 * @param {*} auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0
 * @param {*} auto_node 执行自动分账动作的节点，枚举值【pay、callback】分别表示【付款成功后分账、回调成功后分账】
 * @param {*} config_no 分账配置单号。支持多个分账，使用,号分割
 * @param {*} biz_params 附加业务参数。json对象，具体参考API文档
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
 * @return {*} 返回拉起微信支付的URL。
 */
async function wapPayAsync(out_trade_no, total_fee, mch_id, body, attach, notify_url, return_url, auto, auto_node, config_no, biz_params, payKey) {
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
        body: body
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
    if (!Common.isEmpty(biz_params)) {
        if (!Common.isObject(biz_params)) {
            console.error("yungouos sdk error", "biz_params不是合法的json");
            return null;
        }
        params.biz_params = JSON.stringify(biz_params);
    }
    let response = await HttpUtil.post(WxPayConfig.wapPay, params);
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
 * H5支付（异步）
 * 
 * 微信H5支付接口，在非微信以外的第三方浏览器环境下拉起微信客户端进行付款。
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/wapPay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} body 商品描述
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} return_url 同步回调地址，用户支付成功后从微信APP跳转回该地址。调转不会携带任何参数，如需携带参数请自行拼接
 * @param {*} auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0
 * @param {*} auto_node 执行自动分账动作的节点，枚举值【pay、callback】分别表示【付款成功后分账、回调成功后分账】
 * @param {*} config_no 分账配置单号。支持多个分账，使用,号分割
 * @param {*} biz_params 附加业务参数。json对象，具体参考API文档
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
 * @return {*} 返回拉起微信支付的URL。
 */
function wapPay(out_trade_no, total_fee, mch_id, body, attach, notify_url, return_url, auto, auto_node, config_no, biz_params, payKey) {
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
        body: body
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
    if (!Common.isEmpty(biz_params)) {
        if (!Common.isObject(biz_params)) {
            console.error("yungouos sdk error", "biz_params不是合法的json");
            return null;
        }
        params.biz_params = JSON.stringify(biz_params);
    }
    return HttpUtil.post(WxPayConfig.wapPay, params);
}




/**
 * APP支付（同步）
 * 
 * 微信APP支付接口，返回APP拉起微信支付的参数，用户只需在APP端做拉起支付的动作即可。
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/appPay
 * 
 * @param {*} app_id 微信开放平台申请的APPID
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} body 商品描述
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0
 * @param {*} auto_node 执行自动分账动作的节点，枚举值【pay、callback】分别表示【付款成功后分账、回调成功后分账】
 * @param {*} config_no 分账配置单号。支持多个分账，使用,号分割
 * @param {*} biz_params 附加业务参数。json对象，具体参考API文档
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
 * @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/appPay
 */
async function appPayAsync(app_id, out_trade_no, total_fee, mch_id, body, attach, notify_url, auto, auto_node, config_no, biz_params, payKey) {
    if (Common.isEmpty(app_id)) {
        console.error("yungouos sdk error", "APPID不能为空");
        return null;
    }
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
        app_id: app_id,
        out_trade_no: out_trade_no,
        total_fee: total_fee,
        mch_id: mch_id,
        body: body
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
    if (!Common.isEmpty(auto)) {
        params.auto = auto;
    }
    if (!Common.isEmpty(auto_node)) {
        params.auto_node = auto_node;
    }
    if (!Common.isEmpty(config_no)) {
        params.config_no = config_no;
    }
    if (!Common.isEmpty(biz_params)) {
        if (!Common.isObject(biz_params)) {
            console.error("yungouos sdk error", "biz_params不是合法的json");
            return null;
        }
        params.biz_params = JSON.stringify(biz_params);
    }
    let response = await HttpUtil.post(WxPayConfig.appPay, params);
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
 * APP支付（异步）
 * 
 * 微信APP支付接口，返回APP拉起微信支付的参数，用户只需在APP端做拉起支付的动作即可。
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/appPay
 * 
 * @param {*} app_id 微信开放平台申请的APPID
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} body 商品描述
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0
 * @param {*} auto_node 执行自动分账动作的节点，枚举值【pay、callback】分别表示【付款成功后分账、回调成功后分账】
 * @param {*} config_no 分账配置单号。支持多个分账，使用,号分割
 * @param {*} biz_params 附加业务参数。json对象，具体参考API文档
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
 * @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/appPay
 */
function appPay(app_id, out_trade_no, total_fee, mch_id, body, attach, notify_url, auto, auto_node, config_no, biz_params, payKey) {
    if (Common.isEmpty(app_id)) {
        console.error("yungouos sdk error", "APPID不能为空");
        return null;
    }
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
        app_id: app_id,
        out_trade_no: out_trade_no,
        total_fee: total_fee,
        mch_id: mch_id,
        body: body
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
    if (!Common.isEmpty(auto)) {
        params.auto = auto;
    }
    if (!Common.isEmpty(auto_node)) {
        params.auto_node = auto_node;
    }
    if (!Common.isEmpty(config_no)) {
        params.config_no = config_no;
    }
    if (!Common.isEmpty(biz_params)) {
        if (!Common.isObject(biz_params)) {
            console.error("yungouos sdk error", "biz_params不是合法的json");
            return null;
        }
        params.biz_params = JSON.stringify(biz_params);
    }
    return HttpUtil.post(WxPayConfig.appPay, params);
}



/**
 * 发起退款（同步）
 * 
 * 对已支付的订单发起退款
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/refundOrder
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} money 退款金额
 * @param {*} refund_desc 退款描述
 * @param {*} notify_url 异步回调地址，退款成功后会把退款结果发送到该地址，不填则无回调
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
 * @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/refundOrder
 */
async function refundAsync(out_trade_no, mch_id, money, refund_desc, notify_url, payKey) {
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "商户订单号不能为空");
        return null;
    }
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(money)) {
        console.error("yungouos sdk error", "退款金额不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
        return null;
    }
    let params = {
        out_trade_no: out_trade_no,
        mch_id: mch_id,
        money: money
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    if (!Common.isEmpty(refund_desc)) {
        params.refund_desc = refund_desc;
    }
    if (!Common.isEmpty(notify_url)) {
        params.notify_url = notify_url;
    }
    params.sign = sign;
    let response = await HttpUtil.post(WxPayConfig.refundOrder, params);
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
 * 发起退款（异步）
 * 
 * 对已支付的订单发起退款
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/refundOrder
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} money 退款金额
 * @param {*} refund_desc 退款描述
 * @param {*} notify_url 异步回调地址，退款成功后会把退款结果发送到该地址，不填则无回调
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
 * @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/refundOrder
 */
function refund(out_trade_no, mch_id, money, refund_desc, notify_url, payKey) {
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "商户订单号不能为空");
        return null;
    }
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(money)) {
        console.error("yungouos sdk error", "退款金额不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
        return null;
    }
    let params = {
        out_trade_no: out_trade_no,
        mch_id: mch_id,
        money: money
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);

    if (!Common.isEmpty(refund_desc)) {
        params.refund_desc = refund_desc;
    }
    if (!Common.isEmpty(notify_url)) {
        params.notify_url = notify_url;
    }
    params.sign = sign;
    return HttpUtil.post(WxPayConfig.refundOrder, params);
}



/**
 * 查询退款结果（同步）
 * 
 * 对已发起退款申请的订单查询微信支付的退款结果
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/getRefundResult
 * 
 * @param {*} refund_no 退款单号
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
 * @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/getRefundResult
 */
async function getRefundResultAsync(refund_no, mch_id, payKey) {
    if (Common.isEmpty(refund_no)) {
        console.error("yungouos sdk error", "退款单号不能为空");
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
        refund_no: refund_no,
        mch_id: mch_id
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    let response = await HttpUtil.post(WxPayConfig.getRefundResult, params);
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
 * 查询退款结果（异步）
 * 
 * 对已发起退款申请的订单查询微信支付的退款结果
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/getRefundResult
 * 
 * @param {*} refund_no 退款单号
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
 * @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/getRefundResult
 */
function getRefundResult(refund_no, mch_id, payKey) {
    if (Common.isEmpty(refund_no)) {
        console.error("yungouos sdk error", "退款单号不能为空");
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
        refund_no: refund_no,
        mch_id: mch_id
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    return HttpUtil.post(WxPayConfig.getRefundResult, params);
}



/**
 * 下载对账单（同步）
 * 
 * 下载微信官方对账单。商户可以通过该接口下载历史交易清单。返回excel下载地址和原生数据
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/downloadBill
 * 
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} date 对账单日期 示例值：2020-01-23
 * @param {*} end_date 对账单结束日期 示例值：2020-01-25
 * @param {*} device_info 设备或门店信息，接口下单时候通过biz_params传递
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
 * @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/downloadBill
 */
async function downloadBillAsync(mch_id, date, end_date, device_info, payKey) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(date)) {
        console.error("yungouos sdk error", "对账单日期不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
        return null;
    }
    let params = {
        mch_id: mch_id,
        date: date
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    if (!Common.isEmpty(end_date)) {
        params.end_date = end_date;
    }
    if (!Common.isEmpty(device_info)) {
        params.device_info = device_info;
    }
    params.sign = sign;
    let response = await HttpUtil.post(WxPayConfig.downloadBill, params);
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
 * 下载对账单（异步）
 * 
 * 下载微信官方对账单。商户可以通过该接口下载历史交易清单。返回excel下载地址和原生数据
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/downloadBill
 * 
 * @param {*} mch_id 微信支付商户号 登录yungouos.com-》微信支付-》商户管理 微信支付商户号 获取
 * @param {*} date 对账单日期 示例值：2020-01-23
 * @param {*} end_date 对账单结束日期 示例值：2020-01-25
 * @param {*} device_info 设备或门店信息，接口下单时候通过biz_params传递
 * @param {*} payKey 支付密钥 登录yungouos.com-》微信支付-》商户管理 支付密钥 获取
 * @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/downloadBill
 */
function downloadBill(mch_id, date, end_date, device_info, payKey) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(date)) {
        console.error("yungouos sdk error", "对账单日期不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
        return null;
    }
    let params = {
        mch_id: mch_id,
        date: date
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    if (!Common.isEmpty(end_date)) {
        params.end_date = end_date;
    }
    if (!Common.isEmpty(device_info)) {
        params.device_info = device_info;
    }
    params.sign = sign;
    return HttpUtil.post(WxPayConfig.downloadBill, params);
}


export default {
    codePayAsync,
    codePay,
    nativePayAsync,
    nativePay,
    jsapiPayAsync,
    jsapiPay,
    cashierPayAsync,
    cashierPay,
    minAppPay,
    minAppPayParams,
    minAppPayBusiness,
    minAppPayBusinessAsync,
    facePayAsync,
    facePay,
    wapPayAsync,
    wapPay,
    appPayAsync,
    appPay,
    refundAsync,
    refund,
    getRefundResultAsync,
    getRefundResult,
    downloadBillAsync,
    downloadBill
}