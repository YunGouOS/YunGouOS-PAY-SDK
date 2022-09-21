import Common from '../common/Common';
import FinanceConfig from '../config/FinanceConfig';
import HttpUtil from '../util/HttpUtil';
import PaySignUtil from '../util/PaySignUtil';




/**
 * 微信支付分账配置（同步）
 * 
 * 添加分账收款方的账户信息。使用该功能请仔细阅读注意事项。
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/config
 * 
 * @param {*} mch_id 分账方支付商户号
 * @param {*} appId 自定义appId，如果传递了该参数则openId必须是通过该appId获取
 * @param {*} reason 分账原因
 * @param {*} openId 分账收款方的openId，通过授权接口获得。 优先级：高
 * @param {*} receiver_mch_id 分账收款方的商户号。 优先级：低
 * @param {*} name 分账收款方姓名或商户号主体名称。传递了则校验
 * @param {*} rate 分账比例。如：10 则代表分账比例是订单金额的10% 优先级高于money参数
 * @param {*} money 固定分账金额。每笔订单固定分账金额，优先级次于rate参数
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
 * @return {*} 配置单号
 */
async function wxPayConfigAsync(mch_id, appId, reason, openId, receiver_mch_id, name, rate, money, payKey) {
    let channel = "wxpay";
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(reason)) {
        console.error("yungouos sdk error", "分账原因不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
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
 * 微信支付分账配置（异步）
 * 
 * 添加分账收款方的账户信息。使用该功能请仔细阅读注意事项。
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/config
 * 
 * @param {*} mch_id 分账方支付商户号
 * @param {*} appId 自定义appId，如果传递了该参数则openId必须是通过该appId获取
 * @param {*} reason 分账原因
 * @param {*} openId 分账收款方的openId，通过授权接口获得。 优先级：高
 * @param {*} receiver_mch_id 分账收款方的商户号。 优先级：低
 * @param {*} name 分账收款方姓名或商户号主体名称。传递了则校验
 * @param {*} rate 分账比例。如：10 则代表分账比例是订单金额的10% 优先级高于money参数
 * @param {*} money 固定分账金额。每笔订单固定分账金额，优先级次于rate参数
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
 * @return {*} 配置单号
 */
function wxPayConfig(mch_id, appId, reason, openId, receiver_mch_id, name, rate, money, payKey) {
    let channel = "wxpay";
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(reason)) {
        console.error("yungouos sdk error", "分账原因不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
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
 * 支付宝分账配置（同步）
 * 
 * 添加分账收款方的账户信息。使用该功能请仔细阅读注意事项。
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/config
 * 
 * @param {*} mch_id 分账方支付商户号 登录YunGouOS.com-》支付宝-》商户管理-》支付宝商户号 查看商户号
 * @param {*} reason 分账原因
 * @param {*} account 分账收款方支付宝账号
 * @param {*} name 分账收款方支付宝实名姓名
 * @param {*} rate 分账比例。如：10 则代表分账比例是订单金额的10% 优先级高于money参数
 * @param {*} money 固定分账金额。每笔订单固定分账金额，优先级次于rate参数
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥
 * @return {*} 配置单号
 */
async function aliPayConfigAsync(mch_id, reason, account, name, rate, money, payKey) {
    let channel = "alipay";
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(reason)) {
        console.error("yungouos sdk error", "分账原因不能为空");
        return null;
    }
    if (Common.isEmpty(account)) {
        console.error("yungouos sdk error", "分账方支付宝账户不能为空");
        return null;
    }
    if (Common.isEmpty(name)) {
        console.error("yungouos sdk error", "分账方支付宝账户姓名不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
        return null;
    }

    let params = {
        mch_id: mch_id,
        reason: reason,
        channel: channel,
        account: account,
        name: name
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
 * 支付宝分账配置（异步）
 * 
 * 添加分账收款方的账户信息。使用该功能请仔细阅读注意事项。
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/config
 * 
 * @param {*} mch_id 分账方支付商户号
 * @param {*} reason 分账原因
 * @param {*} account 分账收款方支付宝账号
 * @param {*} name 分账收款方支付宝实名姓名
 * @param {*} rate 分账比例。如：10 则代表分账比例是订单金额的10% 优先级高于money参数
 * @param {*} money 固定分账金额。每笔订单固定分账金额，优先级次于rate参数
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
 * @return {*} 配置单号
 */
function aliPayConfig(mch_id, reason, account, name, rate, money, payKey) {
    let channel = "alipay";
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(reason)) {
        console.error("yungouos sdk error", "分账原因不能为空");
        return null;
    }
    if (Common.isEmpty(account)) {
        console.error("yungouos sdk error", "分账方支付宝账户不能为空");
        return null;
    }
    if (Common.isEmpty(name)) {
        console.error("yungouos sdk error", "分账方支付宝账户姓名不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
        return null;
    }

    let params = {
        mch_id: mch_id,
        reason: reason,
        channel: channel,
        account: account,
        name: name
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
    return HttpUtil.post(FinanceConfig.getConfigUrl, params);
}



/**
 * 
 * 废弃，建议使用 wxPayConfig或aliPayConfig方法
 * 
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
async function configAsync(mch_id, appId, reason, channel, openId, receiver_mch_id, name, rate, money, payKey) {
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
 * 
 * 废弃，建议使用 wxPayConfig或aliPayConfig方法
 * 
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
async function createBillV2Async(mch_id, out_trade_no, config_no,rate,money,notify_url,payKey) {
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
    if (!Common.isEmpty(rate)) {
        params.rate = rate;
    }
    if (!Common.isEmpty(money)) {
        params.money = money;
    }
    if (!Common.isEmpty(notify_url)) {
        params.notify_url = notify_url;
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
function createBillV2(mch_id, out_trade_no, config_no, rate, money, notify_url, payKey) {
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
    if (!Common.isEmpty(rate)) {
        params.rate = rate;
    }
    if (!Common.isEmpty(money)) {
        params.money = money;
    }
    if (!Common.isEmpty(notify_url)) {
        params.notify_url = notify_url;
    }
    return HttpUtil.post(FinanceConfig.getCreateBillUrl, params);
}


/**
 * 已废弃，建议使用 createBillV2方法
 * 
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
 * 
 * 已废弃，建议使用 createBillV2方法
 * 
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
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
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
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
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
 * 查询分账（同步）
 * 
 * 查询分账支付结果
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/getInfo
 * 
 * @param {*} mch_id 分账方支付商户号
 * @param {*} ps_no 分账单号
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
 * @return {*} 文档地址：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/getInfo
 */
async function getPayInfoAsync(mch_id, ps_no, payKey) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(ps_no)) {
        console.error("yungouos sdk error", "分账单号不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
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
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/getInfo
 * 
 * @param {*} mch_id 分账方支付商户号
 * @param {*} ps_no 分账单号
 * @param {*} payKey 支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
 * @return {*} 文档地址：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/getInfo
 */
function getPayInfo(mch_id, ps_no, payKey) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "商户号不能为空");
        return null;
    }
    if (Common.isEmpty(ps_no)) {
        console.error("yungouos sdk error", "分账单号不能为空");
        return null;
    }
    if (Common.isEmpty(payKey)) {
        console.error("yungouos sdk error", "支付密钥不能为空");
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
    return HttpUtil.post(FinanceConfig.getFinishUrl, params);
}

/**
 * 转账到微信零钱（同步）
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/wxpay
 *  
 * @param {*} merchant_id  YunGouOS商户ID  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号
 * @param {*} out_trade_no 商户单号
 * @param {*} account 收款账户openid
 * @param {*} account_name 收款方真实姓名
 * @param {*} money 付款金额。单位：元（范围：1~5000）
 * @param {*} desc  付款描述
 * @param {*} mch_id 付款商户号。自有商户接入的开通了代付权限的可以使用，如果使用YunGouOS代付体系可不传
 * @param {*} notify_url 异步回调地址。传递后会将转账结果发送到该地址，不传则无回调。
 * @param {*} key 商户密钥  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号 商户密钥
 */
async function rePayWxPayAsync(merchant_id, out_trade_no, account, account_name, money, desc, mch_id,notify_url, key) {
    if (Common.isEmpty(merchant_id)) {
        console.error("yungouos sdk error", "YunGouOS商户ID不能为空");
        return null;
    }
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "商户单号不能为空");
        return null;
    }
    if (Common.isEmpty(account)) {
        console.error("yungouos sdk error", "收款账户openid不能为空");
        return null;
    }
    if (Common.isEmpty(money)) {
        console.error("yungouos sdk error", "付款金额不能为空");
        return null;
    }
    if (Common.isEmpty(desc)) {
        console.error("yungouos sdk error", "付款描述不能为空");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "商户密钥不能为空");
        return null;
    }
    let params = {
        merchant_id: merchant_id,
        out_trade_no: out_trade_no,
        account: account,
        money: money,
        desc: desc
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, key);
    params.sign = sign;
    if (!Common.isEmpty(account_name)) {
        params.account_name = account_name;
    }
    if (!Common.isEmpty(mch_id)) {
        params.mch_id = mch_id;
    }
    if (!Common.isEmpty(notify_url)) {
        params.notify_url = notify_url;
    }
    let response = await HttpUtil.post(FinanceConfig.getRePayWxPayUrl, params);
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
 * 转账到微信零钱（异步）
 *
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/wxpay
 *
 * @param {*} merchant_id  YunGouOS商户ID  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号
 * @param {*} out_trade_no 商户单号
 * @param {*} account 收款账户openid
 * @param {*} account_name 收款方真实姓名
 * @param {*} money 付款金额。单位：元（范围：1~5000）
 * @param {*} desc  付款描述
 * @param {*} mch_id 付款商户号。自有商户接入的开通了代付权限的可以使用，如果使用YunGouOS代付体系可不传
 * @param {*} notify_url 异步回调地址。传递后会将转账结果发送到该地址，不传则无回调。
 * @param {*} key 商户密钥  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号 商户密钥
 */
function rePayWxPay(merchant_id, out_trade_no, account, account_name, money, desc, mch_id,notify_url, key) {
    if (Common.isEmpty(merchant_id)) {
        console.error("yungouos sdk error", "YunGouOS商户ID不能为空");
        return null;
    }
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "商户单号不能为空");
        return null;
    }
    if (Common.isEmpty(account)) {
        console.error("yungouos sdk error", "收款账户openid不能为空");
        return null;
    }
    if (Common.isEmpty(money)) {
        console.error("yungouos sdk error", "付款金额不能为空");
        return null;
    }
    if (Common.isEmpty(desc)) {
        console.error("yungouos sdk error", "付款描述不能为空");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "商户密钥不能为空");
        return null;
    }
    let params = {
        merchant_id: merchant_id,
        out_trade_no: out_trade_no,
        account: account,
        money: money,
        desc: desc
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, key);
    params.sign = sign;
    if (!Common.isEmpty(account_name)) {
        params.account_name = account_name;
    }
    if (!Common.isEmpty(mch_id)) {
        params.mch_id = mch_id;
    }
    if (!Common.isEmpty(notify_url)) {
        params.notify_url = notify_url;
    }
    return HttpUtil.post(FinanceConfig.getRePayWxPayUrl, params);
}



/**
 * 转账到支付宝（同步）
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/alipay
 *  
 * @param {*} merchant_id  YunGouOS商户ID  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号
 * @param {*} out_trade_no 商户单号
 * @param {*} account 收款账户openid
 * @param {*} account_name 收款方真实姓名
 * @param {*} money 付款金额。单位：元（范围：1~5000）
 * @param {*} desc  付款描述
 * @param {*} mch_id 付款商户号。自有商户接入的开通了代付权限的可以使用，如果使用YunGouOS代付体系可不传
 * @param {*} notify_url 异步回调地址。传递后会将转账结果发送到该地址，不传则无回调。
 * @param {*} key 商户密钥  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号 商户密钥
 */
async function rePayAliPayAsync(merchant_id, out_trade_no, account, account_name, money, desc, mch_id,notify_url, key) {
    if (Common.isEmpty(merchant_id)) {
        console.error("yungouos sdk error", "YunGouOS商户ID不能为空");
        return null;
    }
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "商户单号不能为空");
        return null;
    }
    if (Common.isEmpty(account)) {
        console.error("yungouos sdk error", "收款支付宝账户不能为空");
        return null;
    }
    if (Common.isEmpty(account_name)) {
        console.error("yungouos sdk error", "收款支付宝姓名不能为空");
        return null;
    }
    if (Common.isEmpty(money)) {
        console.error("yungouos sdk error", "付款金额不能为空");
        return null;
    }
    if (Common.isEmpty(desc)) {
        console.error("yungouos sdk error", "付款描述不能为空");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "商户密钥不能为空");
        return null;
    }
    let params = {
        merchant_id: merchant_id,
        out_trade_no: out_trade_no,
        account: account,
        account_name: account_name,
        money: money,
        desc: desc
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, key);
    params.sign = sign;
    if (!Common.isEmpty(mch_id)) {
        params.mch_id = mch_id;
    }
    if (!Common.isEmpty(notify_url)) {
        params.notify_url = notify_url;
    }
    let response = await HttpUtil.post(FinanceConfig.getRePayAliPayUrl, params);
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
 * 转账到支付宝（异步）
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/alipay
 *  
 * @param {*} merchant_id  YunGouOS商户ID  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号
 * @param {*} out_trade_no 商户单号
 * @param {*} account 收款账户openid
 * @param {*} account_name 收款方真实姓名
 * @param {*} money 付款金额。单位：元（范围：1~5000）
 * @param {*} desc  付款描述
 * @param {*} mch_id 付款商户号。自有商户接入的开通了代付权限的可以使用，如果使用YunGouOS代付体系可不传
 * @param {*} notify_url 异步回调地址。传递后会将转账结果发送到该地址，不传则无回调。
 * @param {*} key 商户密钥  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号 商户密钥
 */
function rePayAliPay(merchant_id, out_trade_no, account, account_name, money, desc, mch_id,notify_url,key) {
    if (Common.isEmpty(merchant_id)) {
        console.error("yungouos sdk error", "YunGouOS商户ID不能为空");
        return null;
    }
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "商户单号不能为空");
        return null;
    }
    if (Common.isEmpty(account)) {
        console.error("yungouos sdk error", "收款支付宝账户不能为空");
        return null;
    }
    if (Common.isEmpty(account_name)) {
        console.error("yungouos sdk error", "收款支付宝姓名不能为空");
        return null;
    }
    if (Common.isEmpty(money)) {
        console.error("yungouos sdk error", "付款金额不能为空");
        return null;
    }
    if (Common.isEmpty(desc)) {
        console.error("yungouos sdk error", "付款描述不能为空");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "商户密钥不能为空");
        return null;
    }
    let params = {
        merchant_id: merchant_id,
        out_trade_no: out_trade_no,
        account: account,
        account_name: account_name,
        money: money,
        desc: desc
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, key);
    params.sign = sign;
    if (!Common.isEmpty(mch_id)) {
        params.mch_id = mch_id;
    }
    if (!Common.isEmpty(notify_url)) {
        params.notify_url = notify_url;
    }
    return HttpUtil.post(FinanceConfig.getRePayAliPayUrl, params);
}



/**
 * 查询转账详情（同步）
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/getRePayInfo
 *  
 * @param {*} out_trade_no 商户单号
 * @param {*} merchant_id  YunGouOS商户ID  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号
 * @param {*} key 商户密钥  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号 商户密钥
 */
async function getRePayInfoAsync(out_trade_no, merchant_id, key) {
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "商户单号不能为空");
        return null;
    }
    if (Common.isEmpty(merchant_id)) {
        console.error("yungouos sdk error", "YunGouOS商户ID不能为空");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "商户密钥不能为空");
        return null;
    }
    let params = {
        out_trade_no: out_trade_no,
        merchant_id: merchant_id
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, key);
    params.sign = sign;
    let response = await HttpUtil.get(FinanceConfig.getRePayInfoUrl, params);
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
 * 查询转账详情（异步）
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/getRePayInfo
 *  
 * @param {*} out_trade_no 商户单号
 * @param {*} merchant_id  YunGouOS商户ID  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号
 * @param {*} key 商户密钥  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号 商户密钥
 */
function getRePayInfo(out_trade_no, merchant_id, key) {
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "商户单号不能为空");
        return null;
    }
    if (Common.isEmpty(merchant_id)) {
        console.error("yungouos sdk error", "YunGouOS商户ID不能为空");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "商户密钥不能为空");
        return null;
    }
    let params = {
        out_trade_no: out_trade_no,
        merchant_id: merchant_id
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, key);
    params.sign = sign;
    return HttpUtil.get(FinanceConfig.getRePayInfoUrl, params);
}



/**
 * 转账到银行卡（同步）
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/bank
 *  
 * @param {*} merchant_id  YunGouOS商户ID  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号
 * @param {*} out_trade_no 商户单号
 * @param {*} account 收款账户openid
 * @param {*} account_name 收款方真实姓名
 * @param {*} money 付款金额。单位：元（范围：1~5000）
 * @param {*} desc  付款描述
 * @param {*} bank_type 银行卡类型【0：对私、1：对公】不传默认0
 * @param {*} bank_name 银行名称。对公情况下必传
 * @param {*} bank_code 银行支行联行号。对公情况下必传
 * @param {*} mch_id 付款商户号。自有商户接入的开通了代付权限的可以使用，如果使用YunGouOS代付体系可不传（仅限支付宝商户）
 * @param {*} app_id 付款商户号绑定APPID。自有商户接入的开通了代付权限的可以使用，如果使用YunGouOS代付体系可不传（仅限支付宝商户）    
 * @param {*} notify_url 异步回调地址。传递后会将转账结果发送到该地址，不传则无回调。
 * @param {*} key 商户密钥  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号 商户密钥
 */
async function rePayBankAsync(merchant_id, out_trade_no, account, account_name, money, desc,bank_type,bank_name,bank_code,mch_id,app_id,notify_url,key) {
    if (Common.isEmpty(merchant_id)) {
        console.error("yungouos sdk error", "YunGouOS商户ID不能为空");
        return null;
    }
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "商户单号不能为空");
        return null;
    }
    if (Common.isEmpty(account)) {
        console.error("yungouos sdk error", "银行卡号不能为空");
        return null;
    }
    if (Common.isEmpty(account_name)) {
        console.error("yungouos sdk error", "银行卡姓名不能为空");
        return null;
    }
    if (Common.isEmpty(money)) {
        console.error("yungouos sdk error", "付款金额不能为空");
        return null;
    }
    if (Common.isEmpty(desc)) {
        console.error("yungouos sdk error", "付款描述不能为空");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "商户密钥不能为空");
        return null;
    }
    let params = {
        merchant_id: merchant_id,
        out_trade_no: out_trade_no,
        account: account,
        account_name: account_name,
        money: money,
        desc: desc
    }
    if (!Common.isEmpty(bank_name)) {
        params.bank_name = bank_name;
    }
    if (!Common.isEmpty(bank_code)) {
        params.bank_code = bank_code;
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, key);
    params.sign = sign;
    if (!Common.isEmpty(bank_type)) {
        params.bank_type = bank_type;
    }
    if (!Common.isEmpty(mch_id)) {
        params.mch_id = mch_id;
    }
    if (!Common.isEmpty(app_id)) {
        params.app_id = app_id;
    }
    if (!Common.isEmpty(notify_url)) {
        params.notify_url = notify_url;
    }
    let response = await HttpUtil.post(FinanceConfig.getRePayBankUrl, params);
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
 * 转账到银行卡（异步）
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/bank
 *  
 * @param {*} merchant_id  YunGouOS商户ID  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号
 * @param {*} out_trade_no 商户单号
 * @param {*} account 收款账户openid
 * @param {*} account_name 收款方真实姓名
 * @param {*} money 付款金额。单位：元（范围：1~5000）
 * @param {*} desc  付款描述
 * @param {*} bank_type 银行卡类型【0：对私、1：对公】不传默认0
 * @param {*} bank_name 银行名称。对公情况下必传
 * @param {*} bank_code 银行支行联行号。对公情况下必传
 * @param {*} mch_id 付款商户号。自有商户接入的开通了代付权限的可以使用，如果使用YunGouOS代付体系可不传（仅限支付宝商户）
 * @param {*} app_id 付款商户号绑定APPID。自有商户接入的开通了代付权限的可以使用，如果使用YunGouOS代付体系可不传（仅限支付宝商户）    
 * @param {*} notify_url 异步回调地址。传递后会将转账结果发送到该地址，不传则无回调。
 * @param {*} key 商户密钥  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号 商户密钥
 */
function rePayBank(merchant_id, out_trade_no, account, account_name, money, desc,bank_type,bank_name,bank_code,mch_id,app_id,notify_url,key) {
    if (Common.isEmpty(merchant_id)) {
        console.error("yungouos sdk error", "YunGouOS商户ID不能为空");
        return null;
    }
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "商户单号不能为空");
        return null;
    }
    if (Common.isEmpty(account)) {
        console.error("yungouos sdk error", "银行卡号不能为空");
        return null;
    }
    if (Common.isEmpty(account_name)) {
        console.error("yungouos sdk error", "银行卡姓名不能为空");
        return null;
    }
    if (Common.isEmpty(money)) {
        console.error("yungouos sdk error", "付款金额不能为空");
        return null;
    }
    if (Common.isEmpty(desc)) {
        console.error("yungouos sdk error", "付款描述不能为空");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "商户密钥不能为空");
        return null;
    }
    let params = {
        merchant_id: merchant_id,
        out_trade_no: out_trade_no,
        account: account,
        account_name: account_name,
        money: money,
        desc: desc
    }
    if (!Common.isEmpty(bank_name)) {
        params.bank_name = bank_name;
    }
    if (!Common.isEmpty(bank_code)) {
        params.bank_code = bank_code;
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, key);
    params.sign = sign;
    if (!Common.isEmpty(bank_type)) {
        params.bank_type = bank_type;
    }
    if (!Common.isEmpty(mch_id)) {
        params.mch_id = mch_id;
    }
    if (!Common.isEmpty(app_id)) {
        params.app_id = app_id;
    }
    if (!Common.isEmpty(notify_url)) {
        params.notify_url = notify_url;
    }
    return HttpUtil.post(FinanceConfig.getRePayBankUrl, params);
}



/**
 * 发起批量转账（同步）
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/create
 *
 * @param {*} out_trade_no     商户单号
 * @param {*} mch_id           批量转账商户号 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约中查看
 * @param {*} repay_order_list 收款方列表
 * @param {*} pay_type         转账方式。固定值：alipay目前只支持支付宝转账
 * @param {*} order_title      支付宝收银台页面账单标题
 * @param {*} time_expire      转账超时时间。格式yyyy-MM-dd HH:mm:ss
 * @param {*} description      批量转账描述
 * @param {*} notify_url       异步回调地址。如传递该参数，转账成功后系统将会把转账结果发送到该地址
 * @param {*} return_url       同步回调地址。如传递该参数，转账成功后浏览器会跳转到该地址
 * @param {*} key              商户密钥 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约 商户密钥
 */
async function batchPayCreateAsync(out_trade_no, mch_id, repay_order_list, pay_type, order_title, time_expire, description, notify_url, return_url, key) {
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "商户单号不能为空！");
        return null;
    }
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "批量转账商户号不能为空！");
        return null;
    }
    if (Common.isEmpty(repay_order_list) || repay_order_list.length <= 0) {
        console.error("yungouos sdk error", "收款方不能为空！");
        return null;
    }
    if (Common.isEmpty(pay_type)) {
        console.error("yungouos sdk error", "转账方式不能为空！");
        return null;
    }
    if (Common.isEmpty(order_title)) {
        console.error("yungouos sdk error", "账单标题不能为空！");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "商户密钥不能为空！");
        return null;
    }
    let params = {
        out_trade_no: out_trade_no,
        mch_id: mch_id,
        repay_order_list: JSON.stringify(repay_order_list),
        pay_type: pay_type,
        order_title: order_title
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, key);
    params.sign = sign;
    if (!Common.isEmpty(time_expire)) {
        params.time_expire = time_expire;
    }
    if (!Common.isEmpty(description)) {
        params.description = description;
    }
    if (!Common.isEmpty(notify_url)) {
        params.notify_url = notify_url;
    }
    if (!Common.isEmpty(return_url)) {
        params.return_url = return_url;
    }
    let response = await HttpUtil.post(FinanceConfig.getBatchPayCreateUrl, params);
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
 * 发起批量转账（异步）
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/create
 *
 * @param {*} out_trade_no     商户单号
 * @param {*} mch_id           批量转账商户号 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约中查看
 * @param {*} repay_order_list 收款方列表
 * @param {*} pay_type         转账方式。固定值：alipay目前只支持支付宝转账
 * @param {*} order_title      支付宝收银台页面账单标题
 * @param {*} time_expire      转账超时时间。格式yyyy-MM-dd HH:mm:ss
 * @param {*} description      批量转账描述
 * @param {*} notify_url       异步回调地址。如传递该参数，转账成功后系统将会把转账结果发送到该地址
 * @param {*} return_url       同步回调地址。如传递该参数，转账成功后浏览器会跳转到该地址
 * @param {*} key              商户密钥 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约 商户密钥
 */
function batchPayCreate(out_trade_no, mch_id, repay_order_list, pay_type, order_title, time_expire, description, notify_url, return_url, key) {
    if (Common.isEmpty(out_trade_no)) {
        console.error("yungouos sdk error", "商户单号不能为空！");
        return null;
    }
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "批量转账商户号不能为空！");
        return null;
    }
    if (Common.isEmpty(repay_order_list) || repay_order_list.length <= 0) {
        console.error("yungouos sdk error", "收款方不能为空！");
        return null;
    }
    if (Common.isEmpty(pay_type)) {
        console.error("yungouos sdk error", "转账方式不能为空！");
        return null;
    }
    if (Common.isEmpty(order_title)) {
        console.error("yungouos sdk error", "账单标题不能为空！");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "商户密钥不能为空！");
        return null;
    }
    let params = {
        out_trade_no: out_trade_no,
        mch_id: mch_id,
        repay_order_list: JSON.stringify(repay_order_list),
        pay_type: pay_type,
        order_title: order_title
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, key);
    params.sign = sign;
    if (!Common.isEmpty(time_expire)) {
        params.time_expire = time_expire;
    }
    if (!Common.isEmpty(description)) {
        params.description = description;
    }
    if (!Common.isEmpty(notify_url)) {
        params.notify_url = notify_url;
    }
    if (!Common.isEmpty(return_url)) {
        params.return_url = return_url;
    }
    return HttpUtil.post(FinanceConfig.getBatchPayCreateUrl, params);
}



/**
 * 确认批量转账（同步）
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/sendPay
 *
 * @param {*} out_trade_no 商户单号。与batch_no参数不能同时为空
 * @param {*} batch_no     批次单号。与out_trade_no参数不能同时为空
 * @param {*} mch_id       批量转账商户号 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约中查看
 * @param {*} type         转账类型【web、app】分别表示【PC端确认付款、APP端确认付款】
 * @param {*} app_code     是否转换为二维码【true、false】。当type为app时传递有效，可将返回的付款链接生成二维码。
 * @param {*} key          商户密钥 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约 商户密钥
 */
async function batchPaySendPayAsync(out_trade_no, batch_no, mch_id, type,app_code, key) {
    if (Common.isEmpty(out_trade_no) && Common.isEmpty(batch_no)) {
        console.error("yungouos sdk error", "商户单号和批次单号不能同时为空！");
        return null;
    }
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "批量转账商户号不能为空！");
        return null;
    }
    if (Common.isEmpty(type)) {
        console.error("yungouos sdk error", "转账类型不能为空！");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "商户密钥不能为空！");
        return null;
    }
    let params = {
        mch_id: mch_id,
        type: type
    }
    if (!Common.isEmpty(out_trade_no)) {
        params.out_trade_no = out_trade_no;
    }
    if (!Common.isEmpty(batch_no)) {
        params.batch_no = batch_no;
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, key);
    params.sign = sign;
    if (!Common.isEmpty(app_code)) {
        params.app_code = app_code;
    }
    let response = await HttpUtil.post(FinanceConfig.getBatchPaySendPayUrl, params);
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
 * 确认批量转账（异步）
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/sendPay
 *
 * @param {*} out_trade_no 商户单号。与batch_no参数不能同时为空
 * @param {*} batch_no     批次单号。与out_trade_no参数不能同时为空
 * @param {*} mch_id       批量转账商户号 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约中查看
 * @param {*} type         转账类型【web、app】分别表示【PC端确认付款、APP端确认付款】
 * @param {*} app_code     是否转换为二维码【true、false】。当type为app时传递有效，可将返回的付款链接生成二维码。
 * @param {*} key          商户密钥 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约 商户密钥
 */
function batchPaySendPay(out_trade_no, batch_no, mch_id, type, app_code, key) {
    if (Common.isEmpty(out_trade_no) && Common.isEmpty(batch_no)) {
        console.error("yungouos sdk error", "商户单号和批次单号不能同时为空！");
        return null;
    }
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "批量转账商户号不能为空！");
        return null;
    }
    if (Common.isEmpty(type)) {
        console.error("yungouos sdk error", "转账类型不能为空！");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "商户密钥不能为空！");
        return null;
    }
    let params = {
        mch_id: mch_id,
        type: type
    }
    if (!Common.isEmpty(out_trade_no)) {
        params.out_trade_no = out_trade_no;
    }
    if (!Common.isEmpty(batch_no)) {
        params.batch_no = batch_no;
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, key);
    params.sign = sign;
    if (!Common.isEmpty(app_code)) {
        params.app_code = app_code;
    }
    return HttpUtil.post(FinanceConfig.getBatchPaySendPayUrl, params);
}




/**
 * 查询批量转账（同步）
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/getBatchPayInfo
 *
 * @param {*} out_trade_no 商户单号。与batch_no参数不能同时为空
 * @param {*} batch_no     批次单号。与out_trade_no参数不能同时为空
 * @param {*} mch_id       批量转账商户号 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约中查看
 * @param {*} key          商户密钥 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约 商户密钥
 */
async function getBatchPayInfoAsync(out_trade_no, batch_no, mch_id, key) {
    if (Common.isEmpty(out_trade_no) && Common.isEmpty(batch_no)) {
        console.error("yungouos sdk error", "商户单号和批次单号不能同时为空！");
        return null;
    }
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "批量转账商户号不能为空！");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "商户密钥不能为空！");
        return null;
    }
    let params = {
        mch_id: mch_id
    }
    if (!Common.isEmpty(out_trade_no)) {
        params.out_trade_no = out_trade_no;
    }
    if (!Common.isEmpty(batch_no)) {
        params.batch_no = batch_no;
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, key);
    params.sign = sign;
    let response = await HttpUtil.get(FinanceConfig.getBatchPayInfoUrl, params);
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
 * 查询批量转账（异步）
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/getBatchPayInfo
 *
 * @param {*} out_trade_no 商户单号。与batch_no参数不能同时为空
 * @param {*} batch_no     批次单号。与out_trade_no参数不能同时为空
 * @param {*} mch_id       批量转账商户号 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约中查看
 * @param {*} key          商户密钥 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约 商户密钥
 */
function getBatchPayInfo(out_trade_no, batch_no, mch_id, key) {
    if (Common.isEmpty(out_trade_no) && Common.isEmpty(batch_no)) {
        console.error("yungouos sdk error", "商户单号和批次单号不能同时为空！");
        return null;
    }
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "批量转账商户号不能为空！");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "商户密钥不能为空！");
        return null;
    }
    let params = {
        mch_id: mch_id
    }
    if (!Common.isEmpty(out_trade_no)) {
        params.out_trade_no = out_trade_no;
    }
    if (!Common.isEmpty(batch_no)) {
        params.batch_no = batch_no;
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, key);
    params.sign = sign;
    return HttpUtil.get(FinanceConfig.getBatchPayInfoUrl, params);
}



/**
 * 关闭批量转账（同步）
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/close
 *
 * @param {*} out_trade_no 商户单号。与batch_no参数不能同时为空
 * @param {*} batch_no     批次单号。与out_trade_no参数不能同时为空
 * @param {*} mch_id       批量转账商户号 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约中查看
 * @param {*} key          商户密钥 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约 商户密钥
 */
async function batchPayCloseAsync(out_trade_no, batch_no, mch_id, key) {
    if (Common.isEmpty(out_trade_no) && Common.isEmpty(batch_no)) {
        console.error("yungouos sdk error", "商户单号和批次单号不能同时为空！");
        return null;
    }
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "批量转账商户号不能为空！");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "商户密钥不能为空！");
        return null;
    }
    let params = {
        mch_id: mch_id
    }
    if (!Common.isEmpty(out_trade_no)) {
        params.out_trade_no = out_trade_no;
    }
    if (!Common.isEmpty(batch_no)) {
        params.batch_no = batch_no;
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, key);
    params.sign = sign;
    let response = await HttpUtil.post(FinanceConfig.getCloseBatchPayUrl, params);
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
 * 关闭批量转账（异步）
 * 
 * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/close
 *
 * @param {*} out_trade_no 商户单号。与batch_no参数不能同时为空
 * @param {*} batch_no     批次单号。与out_trade_no参数不能同时为空
 * @param {*} mch_id       批量转账商户号 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约中查看
 * @param {*} key          商户密钥 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约 商户密钥
 */
function batchPayClose(out_trade_no, batch_no, mch_id, key) {
    if (Common.isEmpty(out_trade_no) && Common.isEmpty(batch_no)) {
        console.error("yungouos sdk error", "商户单号和批次单号不能同时为空！");
        return null;
    }
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "批量转账商户号不能为空！");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "商户密钥不能为空！");
        return null;
    }
    let params = {
        mch_id: mch_id
    }
    if (!Common.isEmpty(out_trade_no)) {
        params.out_trade_no = out_trade_no;
    }
    if (!Common.isEmpty(batch_no)) {
        params.batch_no = batch_no;
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, key);
    params.sign = sign;
    return HttpUtil.post(FinanceConfig.getCloseBatchPayUrl, params);
}



export default {
    configAsync,
    config,
    createBillAsync,
    createBill,
    createBillV2Async,
    createBillV2,
    sendPayAsync,
    sendPay,
    getPayInfoAsync,
    getPayInfo,
    finishAsync,
    finish,
    rePayWxPayAsync,
    rePayWxPay,
    rePayAliPayAsync,
    rePayAliPay,
    wxPayConfigAsync,
    wxPayConfig,
    aliPayConfigAsync,
    aliPayConfig,
    getRePayInfoAsync,
    getRePayInfo,
    rePayBankAsync,
    rePayBank,
    batchPayCreateAsync,
    batchPayCreate,
    batchPaySendPayAsync,
    batchPaySendPay,
    getBatchPayInfoAsync,
    getBatchPayInfo,
    batchPayCloseAsync,
    batchPayClose
}