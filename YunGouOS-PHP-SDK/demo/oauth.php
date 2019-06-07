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
    echo <<<EOT
			            <html>
			            <head>
			                <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
			                <meta name="viewport" content="width=device-width, initial-scale=1"/>
			                <title>微信支付</title>
			            </head>
			            <body>
			            </body>
			            </html>
			            <script>
			            //调用微信JS api 支付
			            function jsApiCall()
			            {
			                WeixinJSBridge.invoke(
			                    'getBrandWCPayRequest',$jsapi,
			                    function(res){
			                        WeixinJSBridge.log(res.err_msg);
			                        if(res.err_msg == "get_brand_wcpay_request:ok" ) {
			                            alert("支付成功");
			                        } else {
			                            alert('交易取消'+res.err_msg);
			                        }
			                    }
			                );
			            }

			            function callpay()
			            {
			                if (typeof WeixinJSBridge == "undefined"){
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
			            callpay();
			            </script>
EOT;

} catch (Exception $e) {
    echo('<script type="text/javascript">alert("' . $e->getMessage() . '");window.close();</script>');
}
?>
