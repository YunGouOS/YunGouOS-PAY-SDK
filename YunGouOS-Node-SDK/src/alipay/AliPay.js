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




/**
 * JS支付（同步）
 *
 * JS支付，适用于支付宝网页内打开的H5应用使用支付宝的JSSDK发起支付
 *
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/alipay/jsPay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 支付宝商户号 登录yungouos.com-》支付宝-》商户管理 支付宝商户号 获取
 * @param {*} buyer_id 买家的支付宝唯一用户号（2088开头的16位纯数字）
 * @param {*} body 商品描述
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} payKey 支付密钥 登录yungouos.com-》支付宝-》商户管理 支付密钥 获取
 * @return {*} 返回支付宝的JSSDK所需的参数
 */
async function jsPayAsync(out_trade_no, total_fee, mch_id, buyer_id, body, attach, notify_url, payKey) {
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
    if (Common.isEmpty(buyer_id)) {
        console.error("yungouos sdk error", "买家ID不能为空");
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
        buyer_id: buyer_id,
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
    let response = await HttpUtil.post(AliPayConfig.jsPay, params);
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
 * JS支付（异步）
 *
 * JS支付，适用于支付宝网页内打开的H5应用使用支付宝的JSSDK发起支付
 *
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/alipay/jsPay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 支付宝商户号 登录yungouos.com-》支付宝-》商户管理 支付宝商户号 获取
 * @param {*} buyer_id 买家的支付宝唯一用户号（2088开头的16位纯数字）
 * @param {*} body 商品描述
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} payKey 支付密钥 登录yungouos.com-》支付宝-》商户管理 支付密钥 获取
 * @return {*} 返回支付宝的JSSDK所需的参数
 */
function jsPay(out_trade_no, total_fee, mch_id, buyer_id, body, attach, notify_url, payKey) {
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
    if (Common.isEmpty(buyer_id)) {
        console.error("yungouos sdk error", "买家ID不能为空");
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
        buyer_id: buyer_id,
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
    return HttpUtil.post(AliPayConfig.jsPay, params);
}



/**
 * H5支付（同步）
 *
 * 支付宝H5手机网站接口，可自动打开支付宝APP支付。和WAP接口不同的是，H5可以传递return_url也就是支付后或取消支付可以自动跳回网站
 *
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/alipay/mobilePay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 支付宝商户号 登录yungouos.com-》支付宝-》商户管理 支付宝商户号 获取
 * @param {*} body 商品描述
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} return_url 同步回调地址，用户支付成功后或取消支付都会跳转回到该地址
 * @param {*} payKey 支付密钥 登录yungouos.com-》支付宝-》商户管理 支付密钥 获取
 * @return {*} 返回支付宝H5支付的form表单
 */
async function h5PayAsync(out_trade_no, total_fee, mch_id, body, attach, notify_url, return_url, payKey) {
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
    let response = await HttpUtil.post(AliPayConfig.mobilePay, params);
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
 * 支付宝H5手机网站接口，可自动打开支付宝APP支付。和WAP接口不同的是，H5可以传递return_url也就是支付后或取消支付可以自动跳回网站
 *
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/alipay/mobilePay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 支付宝商户号 登录yungouos.com-》支付宝-》商户管理 支付宝商户号 获取
 * @param {*} body 商品描述
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} return_url 同步回调地址，用户支付成功后或取消支付都会跳转回到该地址
 * @param {*} payKey 支付密钥 登录yungouos.com-》支付宝-》商户管理 支付密钥 获取
 * @return {*} 返回支付宝H5支付的form表单
 */
function h5Pay(out_trade_no, total_fee, mch_id, body, attach, notify_url, return_url, payKey) {
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
    return HttpUtil.post(AliPayConfig.mobilePay, params);
}



/**
 * APP支付（同步）
 *
 * 支付宝原生APP支付，返回APP端拉起支付宝所需的参数
 *
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/alipay/appPay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 支付宝商户号 登录yungouos.com-》支付宝-》商户管理 支付宝商户号 获取
 * @param {*} body 商品描述
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} payKey 支付密钥 登录yungouos.com-》支付宝-》商户管理 支付密钥 获取
 * @return {*} 返回APP端拉起支付宝所需的参数
 */
async function appPayAsync(out_trade_no, total_fee, mch_id, body, attach, notify_url, payKey) {
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
    let response = await HttpUtil.post(AliPayConfig.appPay, params);
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
 * 支付宝原生APP支付，返回APP端拉起支付宝所需的参数
 *
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/alipay/appPay
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} total_fee 支付金额  单位:元
 * @param {*} mch_id 支付宝商户号 登录yungouos.com-》支付宝-》商户管理 支付宝商户号 获取
 * @param {*} body 商品描述
 * @param {*} attach 附加数据，回调时候原路返回 
 * @param {*} notify_url 异步回调地址，用户支付成功后系统将会把支付结果发送到该地址，不填则无回调
 * @param {*} payKey 支付密钥 登录yungouos.com-》支付宝-》商户管理 支付密钥 获取
 * @return {*} 返回APP端拉起支付宝所需的参数
 */
function appPay(out_trade_no, total_fee, mch_id, body, attach, notify_url, payKey) {
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
    return HttpUtil.post(AliPayConfig.appPay, params);
}




/**
 * 发起退款（同步）
 *
 * 对已支付的订单发起退款
 *
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/alipay/refundOrder
 *
 * @param {*} out_trade_no 商户订单号
 * @param {*} mch_id 支付宝商户号 登录yungouos.com-》支付宝-》商户管理 支付宝商户号 获取
 * @param {*} money 退款金额
 * @param {*} refund_desc 退款描述
 * @param {*} payKey 支付密钥 登录yungouos.com-》支付宝-》商户管理 支付密钥 获取
 * @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/pay/alipay/refundOrder
 */
async function refundAsync(out_trade_no, mch_id, money, refund_desc, payKey) {
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
    params.sign = sign;
    if (!Common.isEmpty(refund_desc)) {
        params.refund_desc = refund_desc;
    }
    let response = HttpUtil.post(AliPayConfig.refundOrder, params);
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
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/alipay/refundOrder
 * 
 * @param {*} out_trade_no 商户订单号
 * @param {*} mch_id 支付宝商户号 登录yungouos.com-》支付宝-》商户管理 支付宝商户号 获取
 * @param {*} money 退款金额
 * @param {*} refund_desc 退款描述
 * @param {*} payKey 支付密钥 登录yungouos.com-》支付宝-》商户管理 支付密钥 获取
 * @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/pay/alipay/refundOrder
 */
function refund(out_trade_no, mch_id, money, refund_desc, payKey) {
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
    params.sign = sign;
    if (!Common.isEmpty(refund_desc)) {
        params.refund_desc = refund_desc;
    }
    return HttpUtil.post(AliPayConfig.refundOrder, params);
}



/**
 * 查询退款结果（同步）
 * 
 * 对已发起退款申请的订单查询微信支付的退款结果
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/alipay/getRefundResult
 * 
 * @param {*} refund_no 退款单号
 * @param {*} mch_id 支付宝商户号 登录yungouos.com-》支付宝-》商户管理 支付宝商户号 获取
 * @param {*} payKey 支付密钥 登录yungouos.com-》支付宝-》商户管理 支付密钥 获取
 * @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/pay/alipay/getRefundResult
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
    let response = HttpUtil.post(AliPayConfig.getRefundResult, params);
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
 * API文档地址：https://open.pay.yungouos.com/#/api/api/pay/alipay/getRefundResult
 *
 * @param {*} refund_no 退款单号
 * @param {*} mch_id 支付宝商户号 登录yungouos.com-》支付宝-》商户管理 支付宝商户号 获取
 * @param {*} payKey 支付密钥 登录yungouos.com-》支付宝-》商户管理 支付密钥 获取
 * @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/pay/alipay/getRefundResult
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
    return HttpUtil.post(AliPayConfig.getRefundResult, params);
}


export default {
    nativePayAsync,
    nativePay,
    wapPayAsync,
    wapPay,
    jsPayAsync,
    jsPay,
    h5PayAsync,
    h5Pay,
    appPayAsync,
    appPay,
    refundAsync,
    refund,
    getRefundResultAsync,
    getRefundResult
}