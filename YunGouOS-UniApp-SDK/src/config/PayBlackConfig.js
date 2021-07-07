const apiUrl = "https://api.pay.yungouos.com";

//创建支付盾黑名单
const getCreateUrl = apiUrl + "/api/pay/black/create";

//黑名单验证
const getCheckUrl = apiUrl + "/api/pay/black/check";

export default {
    "getCreateUrl": getCreateUrl,
    "getCheckUrl": getCheckUrl
}