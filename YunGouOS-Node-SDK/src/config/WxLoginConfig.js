const apiUrl = "https://api.pay.yungouos.com";

//获取授权链接
const getOauthUrl = apiUrl + "/api/wxlogin/getOauthUrl";

//查询授权信息
const getBaseOauthInfo = apiUrl + "/api/wxlogin/getBaseOauthInfo";

export default {
    "getOauthUrl": getOauthUrl,
    "getBaseOauthInfo": getBaseOauthInfo
}