const apiUrl = "https://api.pay.yungouos.com";

//一码付
const nativePay = apiUrl + "/api/pay/merge/nativePay";

//一码收
const codePay = apiUrl + "/api/pay/merge/codePay";



export default {
    "nativePay": nativePay,
    "codePay": codePay
}