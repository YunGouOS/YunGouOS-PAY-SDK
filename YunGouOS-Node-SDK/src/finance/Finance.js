import Common from '../common/Common';
import FinanceConfig from '../config/FinanceConfig';
import HttpUtil from '../util/HttpUtil';
import PaySignUtil from '../util/PaySignUtil';


/**
 * 分账配置（同步）
 * 
 * 添加分账收款方的账户信息。使用该功能请仔细阅读注意事项。
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/config
 * 
 * @param {*} mch_id 分账方支付商户号
 * @param {*} appId 自定义appId，如果传递了该参数则openId必须是通过该appId获取
 * @param {*} reason 分账原因
 * @param {*} channel 分账渠道
 * @param {*} openId 分账收款方的openId，通过授权接口获得。 优先级：高
 * @param {*} receiver_mch_id 分账收款方的商户号。 优先级：低
 * @param {*} name 分账收款方姓名或商户号主体名称。传递了则校验
 * @param {*} rate 分账比例。如：10 则代表分账比例是订单金额的10% 优先级高于money参数
 * @param {*} money 固定分账金额。每笔订单固定分账金额，优先级次于rate参数
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
 * @return {*} 配置单号
 */
async function configAsync(mch_id,appId,reason,channel,openId,receiver_mch_id,name,rate,money,payKey) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(reason)) {
        console.error("yungouos sdk error", "分账原因不能为空");
        return null;
    }
    if (Common.isEmpty(channel)) {
        console.error("yungouos sdk error", "分账渠道不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
        return null;
    }

    if ("wxpay" != channel && "alipay" != channel) {
        console.error("yungouos sdk error", "分账渠道参数不合法！参考值：wxpay、alipay");
        return null;
    }

    if (Common.isEmpty(openId) && Common.isEmpty(receiver_mch_id)) {
        console.error("yungouos sdk error", "分账收款方openId、收款帐号、收款商户号不能同时为空！");
        return null;
    }

    let params = {
        mch_id: mch_id,
        reason: reason,
        channel: channel
    }

    if (!Common.isEmpty(openId)) { 
        // 设置了openId参数，参与签名
        params.openId = openId;
    }

    if (!Common.isEmpty(receiver_mch_id)) {
        // 设置了receiver_mch_id参数，参与签名
        params.receiver_mch_id = receiver_mch_id;
    }

    if (!Common.isEmpty(name)) {
       // 设置了name参数，参与签名
        params.name = name;
    }

    if (!Common.isEmpty(rate)) {
        // 设置了rate参数，参与签名
        params.rate = rate;
    }

    if (!Common.isEmpty(money)) {
        // 设置了money参数，参与签名
        params.money = money;
    }

    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    //不参与签名
    if (!Common.isEmpty(appId)) {
        params.appId = appId;
    }
    let response = await HttpUtil.post(FinanceConfig.getConfigUrl, params);
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
 * 分账配置（同步）
 * 
 * 添加分账收款方的账户信息。使用该功能请仔细阅读注意事项。
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/config
 * 
 * @param {*} mch_id 分账方支付商户号
 * @param {*} appId 自定义appId，如果传递了该参数则openId必须是通过该appId获取
 * @param {*} reason 分账原因
 * @param {*} channel 分账渠道
 * @param {*} openId 分账收款方的openId，通过授权接口获得。 优先级：高
 * @param {*} receiver_mch_id 分账收款方的商户号。 优先级：低
 * @param {*} name 分账收款方姓名或商户号主体名称。传递了则校验
 * @param {*} rate 分账比例。如：10 则代表分账比例是订单金额的10% 优先级高于money参数
 * @param {*} money 固定分账金额。每笔订单固定分账金额，优先级次于rate参数
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
 * @return {*} 返回Promise化结果，需要自行处理返回结果
 */
function config(mch_id, appId, reason, channel, openId, receiver_mch_id, name, rate, money, payKey) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(reason)) {
        console.error("yungouos sdk error", "分账原因不能为空");
        return null;
    }
    if (Common.isEmpty(channel)) {
        console.error("yungouos sdk error", "分账渠道不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
        return null;
    }

    if ("wxpay" != channel && "alipay" != channel) {
        console.error("yungouos sdk error", "分账渠道参数不合法！参考值：wxpay、alipay");
        return null;
    }

    if (Common.isEmpty(openId) && Common.isEmpty(receiver_mch_id)) {
        console.error("yungouos sdk error", "分账收款方openId、收款帐号、收款商户号不能同时为空！");
        return null;
    }

    let params = {
        mch_id: mch_id,
        reason: reason,
        channel: channel
    }

    if (!Common.isEmpty(openId)) {
        // 设置了openId参数，参与签名
        params.openId = openId;
    }

    if (!Common.isEmpty(receiver_mch_id)) {
        // 设置了receiver_mch_id参数，参与签名
        params.receiver_mch_id = receiver_mch_id;
    }

    if (!Common.isEmpty(name)) {
        // 设置了name参数，参与签名
        params.name = name;
    }

    if (!Common.isEmpty(rate)) {
        // 设置了rate参数，参与签名
        params.rate = rate;
    }

    if (!Common.isEmpty(money)) {
        // 设置了money参数，参与签名
        params.money = money;
    }

    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    //不参与签名
    if (!Common.isEmpty(appId)) {
        params.appId = appId;
    }
    return HttpUtil.post(FinanceConfig.getConfigUrl, params);
}


/**
 * 生成分账账单（同步）
 * 
 * 对已支付的订单，生成分账账单，后续通过发起分账接口进行分账操作。
 * 
 * 文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/createBill
 * 
 * @param {*} mch_id 分账方支付商户号
 * @param {*} out_trade_no 商户单号 （需要分账的订单号）
 * @param {*} config_no 配置单号（分账收款人配置单号，支持多个 使用,号分割）
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
 * @return {*} 配置单号
 */
async function createBillAsync(mch_id, out_trade_no, config_no, payKey) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "商户单号不能为空！");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
        return null;
    }

    let params = {
        mch_id: mch_id,
        out_trade_no: out_trade_no
    }

    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    //不参与签名
    if (!Common.isEmpty(config_no)) {
        params.config_no = config_no;
    }
    let response = await HttpUtil.post(FinanceConfig.getCreateBillUrl, params);
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
 * 生成分账账单（异步）
 * 
 * 对已支付的订单，生成分账账单，后续通过发起分账接口进行分账操作。
 * 
 * 文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/createBill
 * 
 * @param {*} mch_id 分账方支付商户号
 * @param {*} out_trade_no 商户单号 （需要分账的订单号）
 * @param {*} config_no 配置单号（分账收款人配置单号，支持多个 使用,号分割）
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
 * @return {*} 配置单号
 */
function createBill(mch_id, out_trade_no, config_no, payKey) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "商户单号不能为空！");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
        return null;
    }

    let params = {
        mch_id: mch_id,
        out_trade_no: out_trade_no
    }

    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    //不参与签名
    if (!Common.isEmpty(config_no)) {
        params.config_no = config_no;
    }
    return HttpUtil.post(FinanceConfig.getCreateBillUrl, params);
}




/**
 * 分账支付（同步）
 * 
 * 对已支付的订单，生成分账账单，后续通过发起分账接口进行分账操作。
 * 
 * 文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/sendPay
 * 
 * @param {*} mch_id 分账方支付商户号
 * @param {*} ps_no 分账单号
 * @param {*} description 分账描述
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
 * @return {*} 配置单号
 */
async function sendPayAsync(mch_id, ps_no, description, payKey) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(ps_no)) {
        console.error("yungouos sdk error", "分账单号不能为空");
        return null;
    }
    if (Common.isEmpty(description)) {
        console.error("yungouos sdk error", "分账描述不能为空");
        return null;
    }
    let params = {
        mch_id: mch_id,
        ps_no: ps_no,
        description: description
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    let response = await HttpUtil.post(FinanceConfig.getSendPayUrl, params);
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
 * 分账支付（异步）
 * 
 * 对已支付的订单，生成分账账单，后续通过发起分账接口进行分账操作。
 * 
 * 文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/sendPay
 * 
 * @param {*} mch_id 分账方支付商户号
 * @param {*} ps_no 分账单号
 * @param {*} description 分账描述
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
 * @return {*} 配置单号
 */
function sendPay(mch_id, ps_no, description, payKey) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(ps_no)) {
        console.error("yungouos sdk error", "分账单号不能为空");
        return null;
    }
    if (Common.isEmpty(description)) {
        console.error("yungouos sdk error", "分账描述不能为空");
        return null;
    }
    let params = {
        mch_id: mch_id,
        ps_no: ps_no,
        description: description
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    return HttpUtil.post(FinanceConfig.getSendPayUrl, params);
}




/**
 * 查询分账支付结果（同步）
 * 
 * 查询分账支付结果
 * 
 * 文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/getPayResult
 * 
 * @param {*} mch_id 分账方支付商户号
 * @param {*} ps_no 分账单号
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
 * @return {*} 文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/getPayResult
 */
async function getPayResultAsync(mch_id, ps_no, payKey) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(ps_no)) {
        console.error("yungouos sdk error", "分账单号不能为空");
        return null;
    }
    let params = {
        mch_id: mch_id,
        ps_no: ps_no
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    let response = await HttpUtil.post(FinanceConfig.getPayResultUrl, params);
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
 * 查询分账支付结果（异步）
 * 
 * 查询分账支付结果
 * 
 * 文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/getPayResult
 * 
 * @param {*} mch_id 分账方支付商户号
 * @param {*} ps_no 分账单号
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
 * @return {*} 文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/getPayResult
 */
function getPayResult(mch_id, ps_no, payKey) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(ps_no)) {
        console.error("yungouos sdk error", "分账单号不能为空");
        return null;
    }
    let params = {
        mch_id: mch_id,
        ps_no: ps_no
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    return HttpUtil.post(FinanceConfig.getPayResultUrl, params);
}



/**
 * 完结分账（同步）
 * 
 * 由于分账属性的订单，微信进行了冻结资金不结算的操作，故在分账完成或需解冻该订单款项需调用该接口。成功后金额解冻可正常结算。
 * 
 * 文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/finish
 * 
 * @param {*} mch_id 分账方支付商户号
 * @param {*} out_trade_no 分账单号
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
 * @return {*} 文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/finish
 */
async function finishAsync(mch_id, out_trade_no, payKey) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "分账单号不能为空");
        return null;
    }
    let params = {
        mch_id: mch_id,
        out_trade_no: out_trade_no
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    let response = await HttpUtil.post(FinanceConfig.getFinishUrl, params);
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
 * 完结分账（异步）
 * 
 * 由于分账属性的订单，微信进行了冻结资金不结算的操作，故在分账完成或需解冻该订单款项需调用该接口。成功后金额解冻可正常结算。
 * 
 * 文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/finish
 * 
 * @param {*} mch_id 分账方支付商户号
 * @param {*} out_trade_no 分账单号
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
 * @return {*} 文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/finish
 */
function finish(mch_id, out_trade_no, payKey) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "分账单号不能为空");
        return null;
    }
    let params = {
        mch_id: mch_id,
        out_trade_no: out_trade_no
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, payKey);
    params.sign = sign;
    return HttpUtil.post(FinanceConfig.getFinishUrl, params);
}

export default {
    configAsync,
    config,
    createBillAsync,
    createBill,
    sendPayAsync,
    sendPay,
    getPayResultAsync,
    getPayResult,
    finishAsync,
    finish
}