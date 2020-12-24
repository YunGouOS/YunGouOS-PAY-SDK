const apiUrl = "https://api.pay.yungouos.com";

//分账配置
const getConfigUrl = getConfigUrl + "/api/finance/profitsharing/config";

//生成分账账单
const getCreateBillUrl = apiUrl + "/api/finance/profitsharing/createBill";

//分账支付
const getSendPayUrl = apiUrl + "/api/finance/profitsharing/sendPay";

//查询分账支付结果
const getPayResultUrl = apiUrl + "/api/finance/profitsharing/getPayResult";

//停止分账
const getFinishUrl = apiUrl + "/api/finance/profitsharing/finish";


export default {
    "getConfigUrl": getConfigUrl,
    "getCreateBillUrl": getCreateBillUrl,
    "getSendPayUrl": getSendPayUrl,
    "getPayResultUrl": getPayResultUrl,
    "getFinishUrl": getFinishUrl
}