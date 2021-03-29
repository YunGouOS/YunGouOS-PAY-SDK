const apiUrl = "https://api.pay.yungouos.com";

//刷卡支付
const codePay = apiUrl + "/api/pay/wxpay/codePay";

//扫码支付
const nativePay = apiUrl + "/api/pay/wxpay/nativePay";

//公众号支付
const jsapiPay = apiUrl + "/api/pay/wxpay/jsapi";

//小程序支付
const minAppPay = apiUrl + "/api/pay/wxpay/minAppPay";

//收银台支付
const cashierPay = apiUrl + "/api/pay/wxpay/cashierPay";

//刷脸支付
const facePay = apiUrl + "/api/pay/wxpay/facePay";

//H5支付
const wapPay = apiUrl + "/api/pay/wxpay/wapPay";

//APP支付
const appPay = apiUrl + "/api/pay/wxpay/appPay";

//订单退款
const refundOrder = apiUrl + "/api/pay/wxpay/refundOrder";

//查询退款结果
const getRefundResult = apiUrl + "/api/pay/wxpay/getRefundResult";

//关闭订单
const closeOrder = apiUrl + "/api/pay/wxpay/closeOrder";

//撤销订单
const reverseOrder = apiUrl + "/api/pay/wxpay/reverseOrder";

//查询结算信息
const getWxBillInfo = apiUrl + "/api/pay/wxpay/getWxBillInfo";

//下载订单
const downloadBill = apiUrl + "/api/pay/wxpay/downloadBill";

//查询刷卡支付结果
const getCodePayResult = apiUrl + "/api/pay/wxpay/getCodePayResult";


export default {
    "codePay": codePay,
    "nativePay": nativePay,
    "jsapiPay": jsapiPay,
    "minAppPay": minAppPay,
    "cashierPay": cashierPay,
    "facePay": facePay,
    "wapPay": wapPay,
    "appPay": appPay,
    "refundOrder": refundOrder,
    "getRefundResult": getRefundResult,
    "closeOrder": closeOrder,
    "reverseOrder": reverseOrder,
    "getWxBillInfo": getWxBillInfo,
    "downloadBill": downloadBill,
    "getCodePayResult": getCodePayResult
}