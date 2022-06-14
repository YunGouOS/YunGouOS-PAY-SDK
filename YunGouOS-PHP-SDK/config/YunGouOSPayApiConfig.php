<?php
/**
 *  YunGouOS支付API配置
 *  author YunGouOS
 *  site:www.yungouos.com
 */
//API域名地址
$api_url = "https://api.pay.yungouos.com";

$apiConfig = array(
    //**************************微信相关接口************************************//
    //刷卡支付
    "wxpay_code_pay_url" => $api_url . "/api/pay/wxpay/codePay",
    //扫码支付
    "wxpay_native_pay_url" => $api_url . "/api/pay/wxpay/nativePay",
    //公众号支付
    "wxpay_jsapi_pay_url" => $api_url . "/api/pay/wxpay/jsapi",
    //小程序支付
    "wxpay_minapp_pay_url" => $api_url . "/api/pay/wxpay/minAppPay",
    //收银台支付
    "wxpay_cashier_pay_url" => $api_url . "/api/pay/wxpay/cashierPay",
    //刷脸支付
    "wxpay_face_pay_url" => $api_url . "/api/pay/wxpay/facePay",
    //H5支付
    "wxpay_wap_pay_url" => $api_url . "/api/pay/wxpay/wapPay",
    //APP支付
    "wxpay_app_pay_url" => $api_url . "/api/pay/wxpay/appPay",
     //QQ小程序支付
    "wxpay_qq_pay_url" => $api_url . "/api/pay/wxpay/qqPay",
    //刷脸支付凭证
    "wxpay_face_pay_auth_info_url" => $api_url . "/api/pay/wxpay/getFacePayAuthInfo",
    //发起退款
    "wxpay_refund_order_url" => $api_url . "/api/pay/wxpay/refundOrder",
    //查询退款结果
    "wxpay_get_refund_result_url" => $api_url . "/api/pay/wxpay/getRefundResult",
    //查询微信结算信息
    "wxpay_get_wx_bill_info_url"=>$api_url."/api/pay/wxpay/getWxBillInfo",
    //下载微信对账单
    "wxpay_download_bill_url"=>$api_url."/api/pay/wxpay/downloadBill",
    //查询刷卡支付结果
    "wxpay_get_code_pay_result_url"=>$api_url."/api/wxpay/getCodePayResult",
    //**************************支付宝相关接口************************************//
    //支付宝扫码支付
    "alipay_native_pay_url"=>$api_url."/api/pay/alipay/nativeApi",
    //支付宝WAP支付
    "alipay_wap_pay_url"=>$api_url."/api/pay/alipay/wapPay",
    //支付宝JS支付
    "alipay_js_pay_url"=>$api_url."/api/pay/alipay/jsPay",
    //支付宝H5支付
    "alipay_mobile_pay_url"=>$api_url."/api/pay/alipay/mobilePay",
    //支付宝APP支付
    "alipay_app_pay_url"=>$api_url."/api/pay/alipay/appPay",
    //支付宝发起退款
    "alipay_refund_order_url"=>$api_url."/api/pay/alipay/refundOrder",
    //支付宝查询退款结果
    "alipay_refund_result_url"=>$api_url."/api/pay/alipay/getRefundResult",
    //**************************订单相关接口************************************//
    //查询订单
    "serarch_order_url" => $api_url . "/api/pay/wxpay/getWxPayOrderInfo",

    //**************************分账相关接口************************************//
    //分账配置
    "finance_config_url"=>$api_url."/api/finance/profitsharing/config",
    //生成分账账单
    "finance_create_bill_url"=>$api_url."/api/finance/profitsharing/createBill",
    //发起分账
    "finance_send_pay_url"=>$api_url."/api/finance/profitsharing/sendPay",
    //查询分账
    "finance_get_pay_result_url"=>$api_url."/api/finance/profitsharing/getInfo",
    //停止分账
    "finance_finish_url"=>$api_url."/api/finance/profitsharing/finish",

    //**************************转账付款相关接口************************************//
    //转账到微信零钱
    "repay_wxpay_url" => $api_url . "/api/finance/repay/wxpay",
    //转账到支付宝
    "repay_alipay_url" => $api_url . "/api/finance/repay/alipay",
    //转账到银行卡
    "repay_bank_url" => $api_url . "/api/finance/repay/bank",
    //查询转账结果
    "repay_get_repay_info_url" => $api_url . "/api/finance/repay/getRePayInfo",
    //**************************聚合支付相关接口************************************//
    //一码付
    "merge_native_pay_url" => $api_url . "/api/pay/merge/nativePay",
    //**************************支付盾相关接口************************************//
    "pay_black_create_url" => $api_url . "/api/pay/black/create",
    "pay_black_check_url" => $api_url . "/api/pay/black/check",
    //**************************微信登录相关接口************************************//
    //获取微信授权url
    "wxapi_get_wx_oauth_url"=>$api_url."/api/wx/getOauthUrl",
    //查询微信授权信息
    "wxapi_get_wx_oauth_info"=>$api_url."/api/wx/getOauthInfo",
    //微信扫码登录
    "wxapi_get_wx_web_login"=>$api_url."/api/wx/getWebLogin"
);

return $apiConfig;



