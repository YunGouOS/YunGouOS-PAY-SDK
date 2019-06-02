<?php
/**
 * 微信授权回调演示控制类
 */

//引入支付API
require_once dirname(dirname(__FILE__)) . '/wxpay/WxPay.php';


//接受授权code
$code = trim($_GET['code']);

$wxpay = new WxPay();

try {
    //通过授权code 查询授权信
    $result = $wxpay->getOauthInfo($code);

    //拿到openid
    $openId = $result['openId'];
    //拿到发起授权时候传递的参数
    $params = @json_decode($result['params']['params'], true);

    //发起jsapi支付
    $jsapi = $wxpay->jsapiPay($params['out_trade_no'], $params['total_fee'], $params['mch_id'], $params['body'], $openId, $params['attach'], $params['notify_url'], $params['return_url'], $params['key']);

    //此处为了方便演示，直接输出了html页面
    $html = "<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">
    <meta name=\"viewport\" content=\"maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0\" />
    <meta name=\"format-detection\" content=\"telephone=no,email=no,date=no,address=no\"><title>微信JSAPI支付演示</title></head></html><script type=\"text/javascript\">//调用微信JS api 支付
        function jsApiCall()
        {
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
                $jsapi,
                function(res){
                    WeixinJSBridge.log(res.err_msg);
                    if(res.err_msg=='get_brand_wcpay_request:ok'){
    	    	        alert('支付成功!');
    	            }else{
    	    	        alert('支付失败'+res.err_msg);//这里一直返回getBrandWCPayRequest提示fail_invalid appid
    	            }
                }
            );
        }
        function callpay()
        {
            if (typeof WeixinJSBridge == \"undefined\"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                    document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                }
            }else{
                jsApiCall();
            }
        }
</script>";

    echo $html;

} catch (Exception $e) {
    echo('<script type="text/javascript">alert("' . $e->getMessage() . '");window.close();</script>');
}
?>
