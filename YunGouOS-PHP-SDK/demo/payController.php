<?php
/**
 * 微信支付集成演示
 */

//引入支付API
require_once dirname(dirname(__FILE__)) . '/wxpay/WxPay.php';
require_once dirname(dirname(__FILE__)) . '/alipay/AliPay.php';
require_once dirname(dirname(__FILE__)) . '/wxapi/WxApi.php';

//支付接口
$apitype = trim($_POST['apitype']);

//商户订单号，商户网站订单系统中唯一订单号，必填
$out_trade_no = trim($_POST['out_trade_no']);

//支付金额 单位元
$total_fee = trim($_POST['total_fee']);

//支付商户号
$mch_id = trim($_POST['mch_id']);

//商品描述
$body = trim($_POST['body']);

//返回类型（1、返回微信原生的支付连接需要自行生成二维码；2、直接返回付款二维码地址，页面上展示即可。不填默认1 ）
$type = trim($_POST['type']);

//附加数据
$attach = trim($_POST['attach']);

//异步回调地址
$notify_url = trim($_POST['notify_url']);

//同步回调地址
$return_url = trim($_POST['return_url']);

//授权结束后回调地址 jsapi支付才需要
$callback_url = trim($_POST['callback_url']);

//商户密钥 登录YunGouOS.com-》微信支付/支付宝-》我的支付 查看密钥
$key = trim($_POST['key']);

$wxpay = new WxPay();

$alipay = new AliPay();

$wxapi = new WxApi();

try {

    switch ($apitype) {
        case "native":
            //扫码支付
            $result = $wxpay->nativePay($out_trade_no, $total_fee, $mch_id, $body, $type, $attach, $notify_url, null, null, null, null,$key);
            //此处type传递的是2 所以返回的是支付二维码的地址直接显示即可。如果传递1 返回的是微信原生的二维码支付连接，需要自己写生成二维码图片的逻辑
            $html = '<img src="' . $result . '"/>';
            echo $html;
            break;
        case "cashier":
            //收银台支付
            $result = $wxpay->cashierPay($out_trade_no, $total_fee, $mch_id, $body, $attach, $notify_url, $return_url, null, null, null,null, $key);
            //收银台返回的是收银台地址，此处直接重定向到该地址即可
            header("Location: " . $result . "");
            exit;
            break;
        case "jsapi":
            //公众号支付比较繁琐 需要先获取微信openid

            //此处我们将支付参数作为额外参数传递过去，方便授权结束后获取到这些支付参数直接发起支付
            //注意，这么做理论上是不安全的，我们建议用户自己生成缓存 传递一个key，授权结束后根据这个key在自己系统的缓存服务中获取到这些信息
            $params = array(
                'out_trade_no' => $out_trade_no,
                'total_fee' => $total_fee,
                'mch_id' => $mch_id,
                'body' => $body,
                'attach' => $attach,
                'notify_url' => $notify_url,
                'key' => $key
            );
            $result =$wxapi->getWxOauthUrl($mch_id,$callback_url,null,$params,$key);
            //此处返回的是微信授权链接，直接重定向
            header("Location: " . $result . "");
            break;
        case "wxpay_h5":
            //微信H5支付
            $result = $wxpay->wapPay($out_trade_no, $total_fee, $mch_id, $body, $attach, $notify_url, $return_url, null, null, null, null,$key);
            //此处返回的是微信H5的支付连接，直接重定向到该地址即可拉起微信客户端支付
            header("Location: " . $result . "");
            break;
        case "wxpay_app":
            //微信APP支付
            $appId = "";//微信开放平台申请的移动应用的APPID
            $result = $wxpay->appPay($appId, $out_trade_no, $total_fee, $mch_id, $body, $attach, $notify_url, null, null, null,null, $key);
            //返回拉起APP支付的参数，需要APP客户端遵循微信官方规则进行拉起支付
            break;
        case "alipay_native":
            //扫码支付
            $result = $alipay->nativePay($out_trade_no, $total_fee, $mch_id, $body, $type, $attach, $notify_url,null,null,null,null,null, $key);
            //此处type传递的是2 所以返回的是支付二维码的地址直接显示即可。如果传递1 返回的是支付宝原生的二维码支付连接，需要自己写生成二维码图片的逻辑
            $html = '<img src="' . $result . '"/>';
            echo $html;
            break;
        case "alipay_wap":
            $result = $alipay->wapPay($out_trade_no, $total_fee, $mch_id, $body, $attach, $notify_url,null,null,null,null,null, $key);
            //此处返回的是支付宝的原生支付连接，重定向即可自动打开支付宝付款
            header("Location: " . $result . "");
            break;
        default:
            break;
    }


} catch (Exception $e) {
    echo('<script type="text/javascript">alert("' . $e->getMessage() . '");window.close();</script>');
}
?>
