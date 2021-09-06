const apiUrl = "https://api.pay.yungouos.com";

//获取授权链接
const getOauthUrl = apiUrl + "/api/wx/getOauthUrl";

//微信扫码登录
const getWebLogin = apiUrl + "/api/wx/getWebLogin";

//查询授权信息
const getOauthInfo = apiUrl + "/api/wx/getOauthInfo";

export default {
    "getOauthUrl": getOauthUrl,
    "getWebLogin": getWebLogin,
    "getOauthInfo": getOauthInfo
}