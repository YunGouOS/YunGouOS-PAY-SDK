const apiUrl = "https://api.pay.yungouos.com";


//条码支付
const codePay = apiUrl + "/api/pay/alipay/codePay";

//扫码支付
const nativePay = apiUrl + "/api/pay/alipay/nativePay";

//wap支付
const wapPay = apiUrl + "/api/pay/alipay/wapPay";

//js支付
const jsPay = apiUrl + "/api/pay/alipay/jsPay";

//h5支付
const mobilePay = apiUrl + "/api/pay/alipay/mobilePay";

//APP支付
const appPay = apiUrl + "/api/pay/alipay/appPay";

//电脑网站支付
const webPay = apiUrl + "/api/pay/alipay/webPay";

//订单退款
const refundOrder = apiUrl + "/api/pay/alipay/refundOrder";

//查询退款结果
const getRefundResult = apiUrl + "/api/pay/alipay/getRefundResult";

//关闭订单
const closeOrder = apiUrl + "/api/pay/alipay/closeOrder";

//撤销订单
const reverseOrder = apiUrl + "/api/pay/alipay/reverseOrder";

export default {
    "codePay": codePay,
    "nativePay": nativePay,
    "wapPay": wapPay,
    "jsPay": jsPay,
    "mobilePay": mobilePay,
    "appPay": appPay,
    "webPay": webPay,
    "refundOrder": refundOrder,
    "getRefundResult": getRefundResult,
    "closeOrder": closeOrder,
    "reverseOrder": reverseOrder
}
