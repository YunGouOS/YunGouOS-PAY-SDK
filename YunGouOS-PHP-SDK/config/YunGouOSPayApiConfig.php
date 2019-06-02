<?php
/**
 *  YunGouOS支付API配置
 *  author YunGouOS
 *  site:www.yungouos.com
 */
//API域名地址
$api_url = "https://api.pay.yungouos.com";

$apiConfig = array(
    //扫码支付
    "native_pay_url" => $api_url . "/api/pay/wxpay/nativeApi",
    //公众号支付
    "jsapi_pay_url" => $api_url . "/api/pay/wxpay/jsapi",
    //小程序支付
    "minapp_pay_url" => $api_url . "/api/pay/wxpay/minAppApi",
    //收银台支付
    "cashier_pay_url" => $api_url . "/api/pay/wxpay/cashierPay",
    //查询订单
    "serarch_order_url" => $api_url . "/api/pay/wxpay/getWxPayOrderInfo",
    //发起退款
    "refund_order_url" => $api_url . "/api/pay/wxpay/refundOrder",
    //查询退款结果
    "get_refund_result_url" => $api_url . "/api/pay/wxpay/getRefundResult",
    //获取微信授权url
    "get_wx_oauth_url"=>$api_url."/api/wxlogin/getOauthUrl",
    //查询微信授权信息
    "get_wx_oauth_info"=>$api_url."/api/wxlogin/getBaseOauthInfo"
);

return $apiConfig;



