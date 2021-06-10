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

//微信转账到零钱
const getRePayWxPayUrl = apiUrl + "/api/finance/repay/wxpay";

//转账到支付宝
const getRePayAliPayUrl = apiUrl + "/api/finance/repay/alipay";

//银行卡转账
const getRePayBankUrl = apiUrl + "/api/finance/repay/bank";

//查询转账详情
const getRePayInfoUrl = apiUrl + "/api/finance/repay/getRePayInfo";

export default {
    "getConfigUrl": getConfigUrl,
    "getCreateBillUrl": getCreateBillUrl,
    "getSendPayUrl": getSendPayUrl,
    "getPayResultUrl": getPayResultUrl,
    "getFinishUrl": getFinishUrl,
    "getRePayWxPayUrl": getRePayWxPayUrl,
    "getRePayAliPayUrl": getRePayAliPayUrl,
    "getRePayInfoUrl":getRePayInfoUrl,
    "getRePayBankUrl":getRePayBankUrl
}