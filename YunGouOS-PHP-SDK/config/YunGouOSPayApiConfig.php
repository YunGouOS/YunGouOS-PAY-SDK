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
    "wxpay_minapp_pay_url" => $api_url . "/api/pay/wxpay/minAppApi",
    //收银台支付
    "wxpay_cashier_pay_url" => $api_url . "/api/pay/wxpay/cashierPay",
    //刷脸支付
    "wxpay_face_pay_url" => $api_url . "/api/pay/wxpay/facePay",
    //H5支付
    "wxpay_wap_pay_url" => $api_url . "/api/pay/wxpay/wapPay",
    //APP支付
    "wxpay_app_pay_url" => $api_url . "/api/pay/wxpay/appPay",
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
    //微信支付分账配置
    "wxpay_finance_config_url"=>$api_url."/api/finance/profitsharing/config",
    //生成微信支付分账账单
    "wxpay_finance_create_bill_url"=>$api_url."/api/finance/profitsharing/createBill",
    //发起微信支付分账
    "wxpay_finance_send_pay_url"=>$api_url."/api/finance/profitsharing/sendPay",
    //查询微信支付分账结果
    "wxpay_finance_get_pay_result_url"=>$api_url."/api/finance/profitsharing/getPayResult",
    //停止微信分账
    "wxpay_finance_finish_url"=>$api_url."/api/finance/profitsharing/finish",
    //获取微信授权url
    "wx_get_wx_oauth_url"=>$api_url."/api/wxlogin/getOauthUrl",
    //查询微信授权信息
    "wx_get_wx_oauth_info"=>$api_url."/api/wxlogin/getBaseOauthInfo",
    //**************************支付宝相关接口************************************//
    //支付宝扫码支付
    "alipay_native_pay_url"=>$api_url."/api/pay/alipay/nativeApi",
    //支付宝WAP支付
    "alipay_wap_pay_url"=>$api_url."/api/pay/alipay/wapPay",
    //支付宝发起退款
    "alipay_refund_order_url"=>$api_url."/api/pay/alipay/refundOrder",
    //支付宝查询退款结果
    "alipay_refund_result_url"=>$api_url."/api/pay/alipay/getRefundResult",
    //**************************订单相关接口************************************//
    //查询订单
    "serarch_order_url" => $api_url . "/api/pay/wxpay/getWxPayOrderInfo",
    //**************************转账付款相关接口************************************//
    //转账到微信零钱
    "repay_wxpay_url" => $api_url . "/api/finance/repay/wxpay",
    //转账到支付宝
    "repay_alipay_url" => $api_url . "/api/finance/repay/alipay",
);

return $apiConfig;



