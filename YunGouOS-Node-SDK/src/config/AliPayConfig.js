const apiUrl = "https://api.pay.yungouos.com";

//扫码支付
const nativePay = apiUrl + "/api/pay/alipay/nativePay";

//wap支付
const wapPay = apiUrl + "/api/pay/alipay/wapPay";

//h5支付
const mobilePay = apiUrl + "/api/pay/alipay/mobilePay";

//订单退款
const refundOrder = apiUrl + "/api/pay/alipay/refundOrder";

//查询退款结果
const getRefundResult = apiUrl + "/api/pay/alipay/getRefundResult";


export default {
    "nativePay": nativePay,
    "wapPay": wapPay,
    "mobilePay": mobilePay,
    "refundOrder": refundOrder,
    "getRefundResult": getRefundResult
}