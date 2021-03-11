const apiUrl = "https://api.pay.yungouos.com";

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

//订单退款
const refundOrder = apiUrl + "/api/pay/alipay/refundOrder";

//查询退款结果
const getRefundResult = apiUrl + "/api/pay/alipay/getRefundResult";


export default {
    "nativePay": nativePay,
    "wapPay": wapPay,
    "jsPay": jsPay,
    "mobilePay": mobilePay,
    "appPay": appPay,
    "refundOrder": refundOrder,
    "getRefundResult": getRefundResult
}