import Common from '../common/Common';
import WxLoginConfig from '../config/WxLoginConfig';
import HttpUtil from '../util/HttpUtil';
import PaySignUtil from '../util/PaySignUtil';



/**
 * 获取授权链接（同步）
 * 
 * 返回授权URL，客户端需要输出这个url让用户重定向到微信授权页面。授权结束后，系统会携带code到您传入的返回地址上，在您的授权返回地址中获取该code。通过调用查询授权信息接口来查询用户授权数据。
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/wx/getOauthUrl
 * 
 * @param {*} mch_id 微信支付商户号或YunGouOS商户ID
 * @param {*} callback_url 授权完毕后回调地址
 * @param {*} type 授权类型【mp-base：基础授权，不会有授权页面，用户无感知，可获取openid；mp-info：详细授权，首次授权会弹出授权页面，可获取用户昵称、头像等信息；open-url：微信PC端扫码登录url】
 * @param {*} params 额外参数，授权成功后可通过查询接口原路返回
 * @param {*} key 商户号对应的密钥
* @return {*} 微信授权url，直接重定向到该地址 参考文档：https://open.pay.yungouos.com/#/api/api/wx/getOauthUrl
 */
async function getOauthUrlAsync(mch_id, callback_url, type, params, key) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "mch_id不能为空");
        return null;
    }
    if (Common.isEmpty(callback_url)) {
        console.error("yungouos sdk error", "callback_url不能为空");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "key不能为空");
        return null;
    }

    let paramsObj = {
        mch_id: mch_id,
        callback_url: callback_url
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(paramsObj, key);
    paramsObj.sign = sign;
    if (!Common.isEmpty(type)) {
        paramsObj.type = type;
    }
    if (!Common.isEmpty(params)) {
        paramsObj.params = JSON.stringify(params);
    }
    let response = await HttpUtil.post(WxLoginConfig.getOauthUrl, paramsObj);
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
 * 获取授权链接（异步）
 *
 * 返回授权URL，客户端需要输出这个url让用户重定向到微信授权页面。授权结束后，系统会携带code到您传入的返回地址上，在您的授权返回地址中获取该code。通过调用查询授权信息接口来查询用户授权数据。
 *
 * API文档地址：https://open.pay.yungouos.com/#/api/api/wx/getOauthUrl
 *
 * @param {*} mch_id 微信支付商户号或YunGouOS商户ID
 * @param {*} callback_url 授权完毕后回调地址
 * @param {*} type 授权类型【mp-base：基础授权，不会有授权页面，用户无感知，可获取openid；mp-info：详细授权，首次授权会弹出授权页面，可获取用户昵称、头像等信息；open-url：微信PC端扫码登录url】
 * @param {*} params 额外参数，授权成功后可通过查询接口原路返回
 * @param {*} key 商户号对应的密钥
* @return {*} 微信授权url，直接重定向到该地址 参考文档：https://open.pay.yungouos.com/#/api/api/wx/getOauthUrl
 */
function getOauthUrl(mch_id, callback_url, type, params, key) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "mch_id不能为空");
        return null;
    }
    if (Common.isEmpty(callback_url)) {
        console.error("yungouos sdk error", "callback_url不能为空");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "key不能为空");
        return null;
    }

    let paramsObj = {
        mch_id: mch_id,
        callback_url: callback_url
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(paramsObj, key);
    paramsObj.sign = sign;
    if (!Common.isEmpty(type)) {
        paramsObj.type = type;
    }
    if (!Common.isEmpty(params)) {
        paramsObj.params = JSON.stringify(params);
    }
    return HttpUtil.post(WxLoginConfig.getOauthUrl, paramsObj);
}



/**
 * 微信PC端扫码登录（同步）
 * 
 * 获取适用于PC微信扫码登录参数，前端按照微信扫码登录要求传入返回的参数即可。
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/wx/getWebLogin
 * 
 * @param {*} mch_id 微信支付商户号或YunGouOS商户ID
 * @param {*} callback_url 授权完毕后回调地址
 * @param {*} params 额外参数，授权成功后可通过查询接口原路返回
 * @param {*} key 商户号对应的密钥
* @return {*} 微信扫码登录所需的参数对象 参考文档：https://open.pay.yungouos.com/#/api/api/wx/getWebLogin
 */
async function getWebLoginAsync(mch_id, callback_url, params, key) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "mch_id不能为空");
        return null;
    }
    if (Common.isEmpty(callback_url)) {
        console.error("yungouos sdk error", "callback_url不能为空");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "key不能为空");
        return null;
    }

    let paramsObj = {
        mch_id: mch_id,
        callback_url: callback_url
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(paramsObj, key);
    paramsObj.sign = sign;
    if (!Common.isEmpty(params)) {
        paramsObj.params = JSON.stringify(params);
    }
    let response = await HttpUtil.post(WxLoginConfig.getWebLogin, paramsObj);
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
 * 微信PC端扫码登录（异步）
 * 
 * 获取适用于PC微信扫码登录参数，前端按照微信扫码登录要求传入返回的参数即可。
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/wx/getWebLogin
 * 
 * @param {*} mch_id 微信支付商户号或YunGouOS商户ID
 * @param {*} callback_url 授权完毕后回调地址
 * @param {*} params 额外参数，授权成功后可通过查询接口原路返回
 * @param {*} key 商户号对应的密钥
* @return {*} 微信扫码登录所需的参数对象 参考文档：https://open.pay.yungouos.com/#/api/api/wx/getWebLogin
 */
function getWebLogin(mch_id, callback_url, params, key) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "mch_id不能为空");
        return null;
    }
    if (Common.isEmpty(callback_url)) {
        console.error("yungouos sdk error", "callback_url不能为空");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "key不能为空");
        return null;
    }

    let paramsObj = {
        mch_id: mch_id,
        callback_url: callback_url
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(paramsObj, key);
    paramsObj.sign = sign;
    if (!Common.isEmpty(params)) {
        paramsObj.params = JSON.stringify(params);
    }
    return HttpUtil.post(WxLoginConfig.getWebLogin, paramsObj);
}




/**
 * 获取授权信息（同步）
 * 
 * 根据授权返回的code查询授权信息，code查询成功后，24小时内可重复查询。
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/wx/getOauthInfo
 * 
 * @param {*} mch_id 微信支付商户号或YunGouOS商户ID
 * @param {*} code 授权结束后返回的code
 * @param {*} key  商户号对应的密钥
* @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/wx/getOauthInfo
 */
async function getOauthInfoAsync(mch_id, code, key) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "mch_id不能为空");
        return null;
    }
    if (Common.isEmpty(code)) {
        console.error("yungouos sdk error", "code不能为空");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "key不能为空");
        return null;
    }

    let params = {
        mch_id: mch_id,
        code: code
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, key);
    params.sign = sign;
    let response = await HttpUtil.get(WxLoginConfig.getOauthInfo, params);
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
 * 获取授权信息（异步）
 * 
 * 根据授权返回的code查询授权信息，code查询成功后，24小时内可重复查询。
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/wx/getOauthInfo
 * 
 * @param {*} mch_id 微信支付商户号或YunGouOS商户ID
 * @param {*} code 授权结束后返回的code
 * @param {*} key  商户号对应的密钥
* @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/wx/getOauthInfo
 */
function getOauthInfo(mch_id, code, key) {
    if (Common.isEmpty(mch_id)) {
        console.error("yungouos sdk error", "mch_id不能为空");
        return null;
    }
    if (Common.isEmpty(code)) {
        console.error("yungouos sdk error", "code不能为空");
        return null;
    }
    if (Common.isEmpty(key)) {
        console.error("yungouos sdk error", "key不能为空");
        return null;
    }

    let params = {
        mch_id: mch_id,
        code: code
    }
    //上述参数参与签名
    let sign = PaySignUtil.paySign(params, key);
    params.sign = sign;
    return HttpUtil.get(WxLoginConfig.getOauthInfo, params);
}




export default {
    getOauthUrlAsync,
    getOauthUrl,
    getWebLoginAsync,
    getWebLogin,
    getOauthInfoAsync,
    getOauthInfo
}