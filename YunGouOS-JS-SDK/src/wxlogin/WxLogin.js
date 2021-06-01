import Common from '../common/Common';
import WxLoginConfig from '../config/WxLoginConfig';
import HttpUtil from '../util/HttpUtil';



/**
 * 获取授权链接（同步）
 * 
 * 获取授权链接，用于重定向获取用户的openid
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/wxlogin/getOauthUrl
 * 
 * @param {*} url 授权结束后返回的地址（需要包含 http:// 以及携带一个参数）示例值：http://www.baidu.com?a=1
 * @param {*} params 额外参数，授权结束后可通过查询接口查询
* @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/wxlogin/getOauthUrl
 */
async function getOauthUrlAsync(url, params) {
    if (Common.isEmpty(url)) {
        console.error("yungouos sdk error", "url不能为空");
        return null;
    }
    let paramsObj = {
        url: url
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
 * 获取授权链接，用于重定向获取用户的openid
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/wxlogin/getOauthUrl
 * 
 * @param {*} url 授权结束后返回的地址（需要包含 http:// 以及携带一个参数）示例值：http://www.baidu.com?a=1
 * @param {*} params 额外参数，授权结束后可通过查询接口查询
* @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/wxlogin/getOauthUrl
 */
function getOauthUrl(url, params) {
    if (Common.isEmpty(url)) {
        console.error("yungouos sdk error", "url不能为空");
        return null;
    }
    let paramsObj = {
        url: url
    }

    if (!Common.isEmpty(params)) {
        paramsObj.params = JSON.stringify(params);
    }
    return HttpUtil.post(WxLoginConfig.getOauthUrl, paramsObj);
}


/**
 * 获取授权信息（同步）
 * 
 * 用户授权后获取授权信息，可获取到openid
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/wxlogin/getBaseOauthInfo
 * 
 * @param {*} code 授权重定向返回的结果
* @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/wxlogin/getBaseOauthInfo
 */
async function getBaseOauthInfoAsync(code) {
    if (Common.isEmpty(code)) {
        console.error("yungouos sdk error", "code不能为空");
        return null;
    }
    let params = {
        code: code
    }
    let response = await HttpUtil.get(WxLoginConfig.getBaseOauthInfo, params);
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
 * 用户授权后获取授权信息，可获取到openid
 * 
 * API文档地址：https://open.pay.yungouos.com/#/api/api/wxlogin/getBaseOauthInfo
 * 
 * @param {*} code 授权重定向返回的结果
* @return {*} 参考文档：https://open.pay.yungouos.com/#/api/api/wxlogin/getBaseOauthInfo
 */
function getBaseOauthInfo(code) {
    if (Common.isEmpty(code)) {
        console.error("yungouos sdk error", "code不能为空");
        return null;
    }
    let params = {
        code: code
    }
    return HttpUtil.get(WxLoginConfig.getBaseOauthInfo, params);
}



export default {
    getOauthUrlAsync,
    getOauthUrl,
    getBaseOauthInfoAsync,
    getBaseOauthInfo
}