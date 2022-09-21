const apiUrl = "https://api.pay.yungouos.com";

//分账配置
const getConfigUrl = apiUrl + "/api/finance/profitsharing/config";

//生成分账账单
const getCreateBillUrl = apiUrl + "/api/finance/profitsharing/createBill";

//分账支付
const getSendPayUrl = apiUrl + "/api/finance/profitsharing/sendPay";

//查询分账
const getPayResultUrl = apiUrl + "/api/finance/profitsharing/getInfo";

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

//发起批量转账
const getBatchPayCreateUrl = apiUrl + "/api/finance/repay/batch/create";

//确认批量转账
const getBatchPaySendPayUrl = apiUrl + "/api/finance/repay/batch/sendPay";

//查询批量转账
const getBatchPayInfoUrl = apiUrl + "/api/finance/repay/batch/getBatchPayInfo";

//关闭批量转账
const getCloseBatchPayUrl = apiUrl + "/api/finance/repay/batch/close";

export default {
    "getConfigUrl": getConfigUrl,
    "getCreateBillUrl": getCreateBillUrl,
    "getSendPayUrl": getSendPayUrl,
    "getPayResultUrl": getPayResultUrl,
    "getFinishUrl": getFinishUrl,
    "getRePayWxPayUrl": getRePayWxPayUrl,
    "getRePayAliPayUrl": getRePayAliPayUrl,
    "getRePayInfoUrl": getRePayInfoUrl,
    "getRePayBankUrl": getRePayBankUrl,
    "getBatchPayCreateUrl": getBatchPayCreateUrl,
    "getBatchPaySendPayUrl": getBatchPaySendPayUrl,
    "getBatchPayInfoUrl": getBatchPayInfoUrl,
    "getCloseBatchPayUrl": getCloseBatchPayUrl
}